command! SaveAndExecute wall | !node app/kitsune.js
noremap \x :SaveAndExecute<CR>

command! SaveAndRunTests wall | !node_modules/.bin/mocha
noremap \t :SaveAndRunTests<CR>

command! BuildDefine normal adefine("", function()<CR>{<CR>});<ESC>kk^f"
noremap \d :BuildDefine<CR>

command! BuildIt normal ait("", function()<CR>{<CR>});<ESC>kk^f"
noremap \i :BuildIt<CR>
