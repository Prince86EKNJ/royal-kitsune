command! SaveAndRunTests wall | !../node_modules/.bin/mocha . -R spec
noremap \x :SaveAndRunTests<CR>

command! BuildDefine normal adefine("", function()<CR>{<CR>});<ESC>kk^f"
noremap \d :BuildDefine<CR>

command! BuildIt normal ait("", function()<CR>{<CR>});<ESC>kk^f"
noremap \i :BuildIt<CR>
