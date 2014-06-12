command! SaveAndExecute wall | !node index.js
noremap \x :SaveAndExecute<CR>

command! SaveAndRunTests wall | !npm test
noremap \t :SaveAndRunTests<CR>

command! BuildDefine normal adescribe("", function()<CR>{<CR>});<ESC>kk^f"
noremap \d :BuildDefine<CR>

command! BuildIt normal ait("", function()<CR>{<CR>});<ESC>kk^f"
noremap \i :BuildIt<CR>
