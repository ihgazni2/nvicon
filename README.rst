nvicon
------
- generate a .ts file from svg files
- if in angular, also generated a component
- cli tool, NO need to included the codes in your angualar project, just use it to generate

install
-------
- npm install nvicon


usage
-----

angular
=======
- npm install nvicon -g 
- creat a component in your angular project
- goto the comonent dir
- add then do the following
- `nvicon_init`_
- `nvicon_add_icon`_                            to add your svg files to svg-icons.ts
- use the component in your page
- when production use  `nvicon_rm_icon`_  remove all unnecessary icons
- other cli `nvicon_export_svg`_   `nvicon_import_svg`_    `nvicon_show_icons`_   `nvicon_reset`_

stackblitz [DEMO]_ 



    ::
        
        #npm install nvicon -g
        #cd /mnt/sdb/ANGUI/proj/src/app/_components/
        #ng g c cusvg-icons
        #cd cusvg-icons
        #nvicon_init

        cusvg-icons# ls -l
        total 12
        -rw-r--r-- 1 root root 657 Oct 12 09:04 cusvg-icons.component.spec.ts
        -rw-r--r-- 1 root root 909 Oct 12 09:04 cusvg-icons.component.ts
        -rw-r--r-- 1 root root 824 Oct 12 09:04 svg-icons.ts
        cusvg-icons#

        # 
        #role category
        nvicon_add_icon -path role -svg /mnt/sdb/ANGUI/proj/src/assets/app/_components/task/creater.svg
        nvicon_add_icon -path role -svg /mnt/sdb/ANGUI/proj/src/assets/app/_components/task/assigner.svg
        nvicon_add_icon -path role -svg /mnt/sdb/ANGUI/proj/src/assets/app/_components/task/incharger.svg
        nvicon_add_icon -path role -svg /mnt/sdb/ANGUI/proj/src/assets/app/_components/task/collaborator.svg
        nvicon_add_icon -path role -svg /mnt/sdb/ANGUI/proj/src/assets/app/_components/task/supervisor.svg
        nvicon_add_icon -path role -svg /mnt/sdb/ANGUI/proj/src/assets/app/_components/task/reviewer.svg

        #priority category
        nvicon_add_icon -path priority -svg /mnt/sdb/ANGUI/proj/src/assets/app/_components/task/im.svg
        nvicon_add_icon -path priority -svg /mnt/sdb/ANGUI/proj/src/assets/app/_components/task/nonim.svg
        nvicon_add_icon -path priority -svg /mnt/sdb/ANGUI/proj/src/assets/app/_components/task/ur.svg
        nvicon_add_icon -path priority -svg /mnt/sdb/ANGUI/proj/src/assets/app/_components/task/nonur.svg

        #task category
        nvicon_add_icon -path task type  -svg /mnt/sdb/ANGUI/proj/src/assets/app/_components/task/fixed.svg
        nvicon_add_icon -path task type  -svg /mnt/sdb/ANGUI/proj/src/assets/app/_components/task/temp.svg
        nvicon_add_icon -path task brief action  -svg /mnt/sdb/ANGUI/proj/src/assets/app/_components/task/feedback.svg
        #
        cusvg-icons# nvicon_show_icons
        [
          'role.creater',
          'role.assigner',
          'role.incharger',
          'role.collaborator',
          'role.supervisor',
          'role.reviewer',
          'priority.im',
          'priority.nonim',
          'priority.ur',
          'priority.nonur',
          'task.type.fixed',
          'task.type.temp',
          'task.brief.action.feedback'
        ]
        cusvg-icons#

        #remove the old svg files
        #rm /mnt/sdb/ANGUI/proj/src/assets/app/_components/task/*

        #use it in your page
        <app-cusvg-icons name="task.brief.action.feedback" width="30px" height="30px"></app-cusvg-icons>
        

other
=====
- npm install nvicon -g
- `nvicon_init`_
- `nvicon_add_icon`_         to add your svg files to svg-icons.ts 
- tsc svg-icons.ts        to generate a svg-cons.js file for using


    ::

        @#tsc svg-icons.ts

        @#ls -l
        total 100
        drwxr-xr-x 6 root root  4096 Oct 12 16:36 exported-svg-icons
        -rw-r--r-- 1 root root 47087 Oct 12 16:51 svg-icons.js
        -rw-r--r-- 1 root root 47720 Oct 12 16:51 svg-icons.ts

        @#node
        Welcome to Node.js v12.18.2.
        Type ".help" for more information.
        > var svg_icons = require("./svg-icons")
        undefined
        > svg_icons.get_svg_with_name(svg_icons,"role.creater")
        '<svg t="1599010366542" class="icon" viewbox="0 0 1024  .....</svg>'
        >



cli
---
- npm install nvicon -g

nvicon_init  
===========
- generate a init .ts file

    ::
         
        #mkdir workdir
        #cd workdir
        #nvicon_init

        #ls -l
                
        @#ls -l
        total 4
        -rw-r--r-- 1 root root 824 Oct 12 15:35 svg-icons.ts
        @#


nvicon_show_icons
=================
- list all avaliable svg-icon names
- the name is in a splitted-by-dot fmt 
- nvicon_show_icons <category-dict-path splitted by space>

    ::
        
        # just inited svg-icons.ts in last-step  has 0 icon addded
        @#nvicon_show_icons
        []
        @#        


nvicon_add_icon
===============
- add one icon from local-dir-path or remote-url
- nvicon_add_icon -svg <svg file source> -path <category-dict-path splitted by space> -name <optional:rename> -type <optional:file or str>
   

from remote-url
~~~~~~~~~~~~~~~

    ::

        #nvicon_add_icon -svg https://www.flaticon.com/svg/static/icons/svg/2913/2913856.svg -path bear -name blue_and_pink_double    
        @#nvicon_show_icons
        [ 'bear.blue_and_pink_double' ]
        @#
        @#ts-node
        > import * as svg_icons from "./svg-icons"
        {}
        > Object.keys(svg_icons.cfg)
        [ 'bear' ]
        > Object.keys(svg_icons.cfg.bear)
        [ 'blue_and_pink_double' ]
        > var svg = svg_icons.get_svg_with_name(svg_icons,'bear.blue_and_pink_double')
        console.log(svg)

from local-dir
~~~~~~~~~~~~~~
    
    ::
        
        #role category
        nvicon_add_icon -path role -svg ../resource/creater.svg
        nvicon_add_icon -path role -svg ../resource/assigner.svg
        nvicon_add_icon -path role -svg ../resource/incharger.svg
        nvicon_add_icon -path role -svg ../resource/collaborator.svg
        nvicon_add_icon -path role -svg ../resource/supervisor.svg
        nvicon_add_icon -path role -svg ../resource/reviewer.svg
        
        #priority category
        nvicon_add_icon -path priority -svg ../resource/im.svg
        nvicon_add_icon -path priority -svg ../resource/nonim.svg
        nvicon_add_icon -path priority -svg ../resource/ur.svg
        nvicon_add_icon -path priority -svg ../resource/nonur.svg
        
        #task category
        nvicon_add_icon -path task type  -svg ../resource/fixed.svg
        nvicon_add_icon -path task type  -svg ../resource/temp.svg
        nvicon_add_icon -path task brief action  -svg ../resource/feedback.svg
        
        @#nvicon_show_icons
        [
          'bear.blue_and_pink_double',
          'role.creater',
          'role.assigner',
          'role.incharger',
          'role.collaborator',
          'role.supervisor',
          'role.reviewer',
          'priority.im',
          'priority.nonim',
          'priority.ur',
          'priority.nonur',
          'task.type.fixed',
          'task.type.temp',
          'task.brief.action.feedback'
        ]
        @#nvicon_show_icons role
        [
          'role.creater',
          'role.assigner',
          'role.incharger',
          'role.collaborator',
          'role.supervisor',
          'role.reviewer'
        ]
        @#nvicon_show_icons priority
        [ 'priority.im', 'priority.nonim', 'priority.ur', 'priority.nonur' ]
        @#nvicon_show_icons task type
        [ 'task.type.fixed', 'task.type.temp' ]
        @#nvicon_show_icons task brief action
        [ 'task.brief.action.feedback' ]
        @#nvicon_show_icons task brief action feedback
        [ 'task.brief.action.feedback' ]
        @#


nvicon_rm_icon
==============
- remove one icon
- nvicon_rm_icon -path <category-dict-path splitted by space> --force<optional:if-the-path-include-more-than-one-svg>
    
    ::
        
        #nvicon_rm_icon  -path bear
        @#nvicon_show_icons bear
        []
        @#




nvicon_export_svg
=================
- export all svgs from svg-icons.ts to dir
- nvicon_export_svg -path <optional:category-dict-path splitted by space> -dst <optional:exported-dir-name>

    ::  

        @#nvicon_export_svg
        @#ls -l
        total 44
        drwxr-xr-x 6 root root  4096 Oct 12 16:32 exported-svg-icons
        -rw-r--r-- 1 root root 40598 Oct 12 16:26 svg-icons.ts
        @#tree exported-svg-icons
        exported-svg-icons
        ├── bear
        ├── priority
        │   ├── im.svg
        │   ├── nonim.svg
        │   ├── nonur.svg
        │   └── ur.svg
        ├── role
        │   ├── assigner.svg
        │   ├── collaborator.svg
        │   ├── creater.svg
        │   ├── incharger.svg
        │   ├── reviewer.svg
        │   └── supervisor.svg
        └── task
            ├── brief
            │   └── action
            │       └── feedback.svg
            └── type
                ├── fixed.svg
                └── temp.svg
        
        7 directories, 13 files


        @#nvicon_export_svg -path role -dst roles
        @#tree roles/
        roles/
        ├── assigner.svg
        ├── collaborator.svg
        ├── creater.svg
        ├── incharger.svg
        ├── reviewer.svg
        └── supervisor.svg
        
        0 directories, 6 files
        @#    


nvicon_import_svg
=================
- import svgs from a dir
- nvicon_import_svg -src <svg-source-dir> -path <category-dict-path splitted by space>
- this will be slow if too many svg-files in src-dir, coz read/write files frequently    
    
    ::
         
        #nvicon_import_svg -src './exported-svg-icons/' -path duplicate
        @#nvicon_show_icons
        [
          'role.creater',
          'role.assigner',
          'role.incharger',
          'role.collaborator',
          'role.supervisor',
          'role.reviewer',
          'priority.im',
          'priority.nonim',
          'priority.ur',
          'priority.nonur',
          'task.type.fixed',
          'task.type.temp',
          'task.brief.action.feedback',
          'duplicate.priority.im',
          'duplicate.priority.nonim',
          'duplicate.priority.nonur',
          'duplicate.priority.ur',
          'duplicate.role.assigner',
          'duplicate.role.collaborator',
          'duplicate.role.creater',
          'duplicate.role.incharger',
          'duplicate.role.reviewer',
          'duplicate.role.supervisor',
          'duplicate.task.brief.action.feedback',
          'duplicate.task.type.fixed',
          'duplicate.task.type.temp'
        ]
        @#
        
        #nvicon_rm_icon -path duplicate --force

nvicon_reset
~~~~~~~~~~~~
- remove all svgs from svgicons.ts


CODE AND RESOURE REFERECE(THANKS TO)
===================================
- https://medium.com/angular-in-depth/how-to-create-an-icon-library-in-angular-4f8863d95a 
- https://github.com/lipis/flag-icon-css
- https://www.flaticon.com/

API
===

nvicon
------
- NO need, all cli

generated svg-icons.ts  
----------------------
- get_svg_with_name(svg_icons:any,name:string):string
- svg_icons the imported svg-icons
- name category-dict-path splitted by dot

    ::
        
        @#tsc svg-icons.ts

        @#ls -l
        total 100
        drwxr-xr-x 6 root root  4096 Oct 12 16:36 exported-svg-icons
        -rw-r--r-- 1 root root 47087 Oct 12 16:51 svg-icons.js
        -rw-r--r-- 1 root root 47720 Oct 12 16:51 svg-icons.ts

        @#node
        Welcome to Node.js v12.18.2.
        Type ".help" for more information.
        > var svg_icons = require("./svg-icons")
        undefined
        > svg_icons.get_svg_with_name(svg_icons,"role.creater")
        '<svg t="1599010366542" class="icon" viewbox="0 0 1024  .....</svg>'
        >



.. [DEMO] https://stackblitz.com/edit/angular-nvicon
