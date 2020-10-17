使用svgtofont
-------------
- 这是最通用的方法,不局限于框架

    ::
    
        #准备好svg
            task# ls -l | egrep svg
           -rwxr-xr-x 1 root root 4295 Aug 30 02:21 assigner.svg
           -rwxr-xr-x 1 root root 4132 Aug 30 02:21 collaborator.svg
           -rwxr-xr-x 1 root root 1819 Sep  2 01:34 creater.svg
           -rwxr-xr-x 1 root root 2159 Aug 30 02:21 incharger.svg
           -rwxr-xr-x 1 root root 1714 Aug 30 02:21 reviewer.svg
           -rwxr-xr-x 1 root root 3070 Aug 30 02:21 supervisor.svg
           task#
           
        #进入node 执行下列脚本
        const svgtofont = require("svgtofont");
        svgtofont({
            src:'./',
            fontName:'my-font-icon',
            css:true,
        }).then(
            r=>{
            }
        )
        
        #之后会生成下列文件
        
        task# ls -l fonts/
        total 72
        -rw-r--r-- 1 root root  1056 Sep  2 03:43 my-font-icon.css
        -rw-r--r-- 1 root root  2924 Sep  2 03:43 my-font-icon.eot
        -rw-r--r-- 1 root root  1052 Sep  2 03:43 my-font-icon.less
        -rw-r--r-- 1 root root  1064 Sep  2 03:43 my-font-icon.module.less
        -rw-r--r-- 1 root root  1258 Sep  2 03:43 my-font-icon.scss
        -rw-r--r-- 1 root root  1052 Sep  2 03:43 my-font-icon.styl
        -rw-r--r-- 1 root root 12954 Sep  2 03:43 my-font-icon.svg
        -rw-r--r-- 1 root root 16454 Sep  2 03:43 my-font-icon.symbol.svg
        -rw-r--r-- 1 root root  2740 Sep  2 03:43 my-font-icon.ttf
        -rw-r--r-- 1 root root  1748 Sep  2 03:43 my-font-icon.woff
        -rw-r--r-- 1 root root  1324 Sep  2 03:43 my-font-icon.woff2
        task#
        

方法一,使用css+生成的字体
=======================

引入生成的css后（要copy生成的字体文件到项目中）
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    ::
        
        task# ls -l fonts/ | egrep "woff2|\.css"
        -rw-r--r-- 1 root root  1056 Sep  2 03:43 my-font-icon.css
        -rw-r--r-- 1 root root  1324 Sep  2 03:43 my-font-icon.woff2
        task#

CSS 文件中可以查看生成的 class
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    ::
    
        .my-font-icon-assigner:before { content: "\ea01"; }
        .my-font-icon-collaborator:before { content: "\ea02"; }
        .my-font-icon-creater:before { content: "\ea03"; }
        .my-font-icon-incharger:before { content: "\ea04"; }
        .my-font-icon-reviewer:before { content: "\ea05"; }
        .my-font-icon-supervisor:before { content: "\ea06"; }

直接使用class
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    
    ::
    
        <span class="my-font-icon-assigner"></span>


方法二:直接使用生成的.symbol.svg
===============================
- 将这个文件粘在html 前面
    
    ::
     
        <svg>
            ....
            <symbol id="my-font-icon-supervisor">
                <!-- Generator: Sketch 60 (88103) - https://sketch.com -->
                <title>icon_jiandu@2x</title>
                <desc>Created with Sketch.</desc>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="&#x6E05;&#x5355;&#x786E;&#x8BA4;" transform="translate(-206.000000, -1010.000000)" fill="#3496FA">
                        <g id="&#x7F16;&#x7EC4;-7" transform="translate(0.000000, 976.000000)">
                            <g id="&#x7F16;&#x7EC4;-5&#x5907;&#x4EFD;-2" transform="translate(191.000000, 33.000000)">
                                <g id="supervise" transform="translate(15.000000, 1.000000)">
                                    <path d="M15.416922,17.2451821 C18.0359161,17.1748624 20.1226589,15.03171 20.1226589,12.411828 C20.1226589,9.79164998 18.0359161,7.64849756 15.416922,7.57823706 C12.797691,7.64849756 10.7111851,9.79164998 10.7111851,12.411828 C10.7111851,15.03171 12.797691,17.1748624 15.416922,17.2451821 Z M15.416922,10.2001908 C16.6391114,10.2001908 17.6300981,11.1912368 17.6300981,12.4134261 C17.6300981,13.6356155 16.6391114,14.6266615 15.416922,14.6266615 C14.1953837,14.6266615 13.2052848,13.6365626 13.2052848,12.4150243 C13.2052848,11.193782 14.1953837,10.2036831 15.416922,10.2036831 L15.416922,10.2001908 Z M27.2795224,27.5734164 C25.2158644,25.8415868 22.7985362,24.5826394 20.1966485,23.8848289 L20.2553666,23.8605603 C23.2334174,22.6001923 25.603629,20.2299807 26.8637602,17.2521075 C27.5116721,15.7246668 27.8441517,14.0828085 27.8374351,12.4203516 C27.8436781,9.12598057 26.5345362,5.96526435 24.2003723,3.64033435 C21.875028,1.30433551 18.7128911,-0.00616782785 15.416922,2.35612424e-05 C12.122255,-0.00640459449 8.96153879,1.30273734 6.63666799,3.63690123 C4.30250409,5.96177204 2.99336216,9.12248827 3.00002531,12.4169185 C2.99336216,15.7112894 4.30250409,18.8720057 6.63666799,21.1969357 C7.78208579,22.3460825 9.14260608,23.2579893 10.6406286,23.8813366 C8.13634787,24.5532803 5.79152947,25.7447492 3.7758167,27.3828784 C3.3330039,27.7435924 3.26617652,29.0052873 3.62689049,29.4483369 C3.98736769,29.8910905 4.63871271,29.9576811 5.08146633,29.5972039 C11.1816996,24.6547004 19.9272672,24.7229483 25.949545,29.759981 C26.3867938,30.123477 27.0351201,30.0679552 27.4041209,29.6351458 C27.5847146,29.4272647 27.6711936,28.5433901 27.643196,28.2696287 C27.6170925,27.9981757 27.4866932,27.7473215 27.2795224,27.5699833 L27.2795224,27.5734164 Z M8.57288636,19.2609541 C6.74854022,17.4500444 5.72564916,14.9838831 5.73253964,12.4134261 C5.73423195,9.84273238 6.75570241,7.37751815 8.57288636,5.5589728 C11.3479097,2.79939844 15.5096161,1.97764064 19.1253978,3.47524881 C22.7414163,4.97262022 25.1032819,8.49635889 25.1148415,12.4099338 C25.119678,14.9820482 24.0972604,17.4495709 22.2745717,19.2643872 C18.4870158,23.0413478 12.3571867,23.0413478 8.56939405,19.2643872 L8.57288636,19.2609541 Z" id="Fill-1"/>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </symbol>
            ....
        </svg>
        
使用        
~~~~
- <svg><use xlink:href="#my-font-icon-supervisor"></use></svg>


方法3:
======




使用angular:angular可以随时定义,完全使用js
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    ::
        
        import {DomSanitizer} from '@angular/platform-browser';
        import {MatIconRegistry } from '@angular/material/icon';
        
        function regis_svg_icon(iconRegistry,sanitizer,ui_arr){
            for(let entry of ui_arr) {
                let noun = entry.noun;
                let icon = sanitizer.bypassSecurityTrustResourceUrl(entry.icon)
                iconRegistry.addSvgIcon(noun,icon)
            }
        }
        
        ui_arr = [
            ...
            {noun:'creater',icon:'x/x/x/xxxx.svg'....}
            ...
        ]
        
        export class MainComponent implements OnInit {
            constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
                regis_svg_icon(iconRegistry, sanitizer,ROLES)
            }
        }
        
 
 使用
~~~~~~~~~~
    
    ::
    
        <mat-icon svgIcon="creater"></mat-icon>
        <mat-icon svgIcon="assigner"></mat-icon>
        <mat-icon svgIcon="incharger"></mat-icon>
        <mat-icon svgIcon="collaborator"></mat-icon>
        <mat-icon svgIcon="supervisor"></mat-icon>
        <mat-icon svgIcon="reviewer"></mat-icon>



woff2 to svg
--------------
- npm install -g ttf2svg
- npm install --save-dev woff2

    ::
                    
        const nvhtml = require('nvhtml')
        
        function  glyph_to_svg(ele,dirname,size="30") {
            name = ele.attribs['glyph-name']
            path = ele.attribs.d
            let svg_txt = `
                <svg width="${size}px" height="${size}px" viewBox="0 0 ${size} ${size}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                    <path d="${path}" />
                </svg>
            `
            fn = dirname+'/'+name + '.svg'
            fs.writeFileSync(fn,svg_txt)
            return(svg_txt)
        }
        
        
        function glyph_file_to_svgs(fn,size="30") {
            let svg = fs.readFileSync(fn)
            let html = new nvhtml.Html(svg)
            let sdfs = html.$sdfs()
            let font = sdfs.filter(r=>r.tag==='font')[0]
            let dirname = font.attribs.id
            fs.mkdirSync(dirname)
            let arr = sdfs.filter(r=>r.tag==='glyph')
            arr.forEach(r=>{glyph_to_svg(r,dirname,size)})
        }

- http://quasimondo.com/ZorroSVG/
- https://github.com/arenanet/png2svg

