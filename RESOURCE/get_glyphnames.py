from fontTools import ttLib
import functools
from pathlib import Path


_PUA_CODEPOINTS = [
    range(0xE000, 0xF8FF + 1),
    range(0xF0000, 0xFFFFD + 1),
    range(0x100000, 0x10FFFD + 1)
]


def _is_pua(codepoint):
  return any(r for r in _PUA_CODEPOINTS if codepoint in r)


def _cmap(ttfont):
  def _cmap_reducer(acc, u):
    acc.update(u)
    return acc
  unicode_cmaps = (t.cmap for t in ttfont['cmap'].tables if t.isUnicode())
  return functools.reduce(_cmap_reducer, unicode_cmaps, {})


def get_liga_lookups(ttfont):
    liga_lookups = tuple(
        filter(lambda l: l.LookupType == 4,ttfont['GSUB'].table.LookupList.Lookup)
    )
    return(liga_lookups)



def _ligatures(ttfont):
    liga_lookups = get_liga_lookups(ttfont)
    for lookup in liga_lookups:
        for subtable in lookup.SubTable:
            yield subtable.ligatures

def get_ligature_dict_arr(ttfont):
    g = _ligatures(ttfont)
    return(list(g))


def d_to_kvlist(d):
    kl = d.keys()
    vl = d.values()
    return((kl,vl))

def get_glyph_names_with_ligature_dict(ld,rev_cmap):
    glyph_names = {}
    for first_glyph_name in ld:
        larr = ld[first_glyph_name]
        for lg in larr:
            arr = [first_glyph_name] + lg.Component
            icon_name = ''.join(chr(rev_cmap[n]) for n in arr)
            codepoint = rev_cmap[lg.LigGlyph]
            glyph_names[icon_name] = codepoint
            glyph_names[codepoint] = icon_name
    return(glyph_names)

def get_all_glyph_names(ttfont):
    cmap = _cmap(ttfont)
    rev_cmap = {v: k for k, v in cmap.items()}
    ldarr = get_ligature_dict_arr(ttfont)
    names = {}
    for ld in ldarr:
        names.update(get_glyph_names_with_ligature_dict(ld,rev_cmap))
    if(len(names)>0):
        return(names)
    else:
        rev_cmap.update(cmap)
        return(rev_cmap)


'''
def enumerate(font_file: Path):
  """Yields (icon name, codepoint) tuples for icon font."""
  with ttLib.TTFont(font_file) as ttfont:
    cmap = _cmap(ttfont)
    rev_cmap = {v: k for k, v in cmap.items()}
    for lig_root in _ligatures(ttfont):
      for first_glyph_name, ligatures in lig_root.items():
        for ligature in ligatures:
          glyph_names = (first_glyph_name,) + tuple(ligature.Component)
          icon_name = ''.join(chr(rev_cmap[n]) for n in glyph_names)
          codepoint = rev_cmap[ligature.LigGlyph]
          if not _is_pua(codepoint):
            continue
          yield (icon_name, codepoint)
'''


import sys
from efdir import fs

fn = sys.argv[1]
ttfont = ttLib.TTFont(fn)
fs.wjson(fn+'.name.json',get_all_glyph_names(ttfont))
