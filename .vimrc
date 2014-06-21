command! SaveAndExecute wall | !node kitsune.js
noremap \x :SaveAndExecute<CR>

command! SaveAndRunTests wall | !npm test
noremap \t :SaveAndRunTests<CR>

command! SaveAndRunCoverage wall | !make cover
noremap \c :SaveAndRunCoverage<CR>

command! BuildDefine normal adescribe("", function()<CR>{<CR>});<ESC>kk^f"
noremap \d :BuildDefine<CR>

command! BuildIt normal ait("", function()<CR>{<CR>});<ESC>kk^f"
noremap \i :BuildIt<CR>
