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


def _ligatures(ttfont):
  liga_lookups = tuple(
      filter(lambda l: l.LookupType == 4,
             ttfont['GSUB'].table.LookupList.Lookup))
  for lookup in liga_lookups:
    for subtable in lookup.SubTable:
      yield subtable.ligatures


def enumerate(font_file: Path):
  """Yields (icon name, codepoint) tuples for icon font."""
  with ttLib.TTFont(font_file) as ttfont:
    cmap = _cmap(ttfont)
    rev_cmap = {v: k for k, v in cmap.items()}
    for lig_root in _ligatures(ttfont):
      for first_glyph_name, ligatures in lig_root.items():
        for ligature in ligatures:
          glyph_names = (first_glyph_name,) + tuple(ligature.Component)
          print(glyph_names)
          icon_name = ''.join(chr(rev_cmap[n]) for n in glyph_names)
          codepoint = rev_cmap[ligature.LigGlyph]
          if not _is_pua(codepoint):
            continue
          yield (icon_name, codepoint)


import sys
woff2 = sys.argv[1]
g = enumerate(woff2)

from efdir import fs
from xlist.map import mapv

arr = list(g)
arr = mapv(arr,lambda r:r[0])

from os import path
dst = path.splitext(woff2)[0]
print(dst,arr)
fs.wjson(dst + ".name.json",arr)

