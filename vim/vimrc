set nocompatible              " be iMproved, required
filetype off                  " required

" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')

" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'

" format codes
Plugin 'Chiel92/vim-autoformat'

" nice status&tabline
Plugin 'vim-airline/vim-airline'
Plugin 'vim-airline/vim-airline-themes'

" javascript
Plugin 'tpope/vim-surround'
Plugin 'leshill/vim-json'
Plugin 'isRuslan/vim-es6'
Plugin 'pangloss/vim-javascript'
Plugin 'godlygeek/tabular'
Plugin 'plasticboy/vim-markdown'

" The following are examples of different formats supported.
" Keep Plugin commands between vundle#begin/end.
" plugin on GitHub repo
"Plugin 'tpope/vim-fugitive'
" plugin from http://vim-scripts.org/vim/scripts.html
" Plugin 'L9'
" Git plugin not hosted on GitHub
Plugin 'git://github.com/digitaltoad/vim-pug.git'

"Plugin 'git://git.wincent.com/command-t.git'
" git repos on your local machine (i.e. when working on your own plugin)
"Plugin 'file:///home/gmarik/path/to/plugin'
" The sparkup vim script is in a subdirectory of this repo called vim.
" Pass the path to set the runtimepath properly.
"Plugin 'rstacruz/sparkup', {'rtp': 'vim/'}
" Install L9 and avoid a Naming conflict if you've already installed a
" different version somewhere else.
" Plugin 'ascenator/L9', {'name': 'newL9'}

" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required
" To ignore plugin indent changes, instead use:
"filetype plugin on
"
" Brief help
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal
"
" see :h vundle for more details or wiki for FAQ
" Put your non-Plugin stuff after this line


syntax enable
set background=dark
colorscheme solarized


"粘贴模式切换快捷键
set pastetoggle=<f5>

"粘贴时保持格式
"set paste

"显示行号, 或set number
set nu

"设置数字统一为十进制
set nrformats=

"高亮光标所在行
set cursorline

"总是显示状态行
set laststatus=2

"标尺功能，显示当前光标所在行列号
set ruler

"高亮显示匹配的括号
set showmatch

"高亮被搜索的句子
set hlsearch

"制表符为2
set tabstop=2

"统一缩进为2
set softtabstop=2
set shiftwidth=2

set expandtab

"继承前一行的缩进方式，特别适用于多行注释
set autoindent

"自动补全
set completeopt=longest,menu

"自动补全命令时候使用菜单式匹配列表
set wildmenu
autocmd FileType ruby,eruby set omnifunc=rubycomplete#Complete
autocmd FileType python set omnifunc=pythoncomplete#Complete
autocmd FileType javascript set omnifunc=javascriptcomplete#CompleteJS
autocmd FileType html set omnifunc=htmlcomplete#CompleteTags
autocmd FileType css set omnifunc=csscomplete#CompleteCSS
autocmd FileType xml set omnifunc=xmlcomplete#CompleteTags
autocmd FileType java set omnifunc=javacomplete#Complet

"F3自动格式化代码
noremap <F3> :Autoformat<CR>
let g:autoformat_verbosemode=1
let g:formatters_javascript = ['jsbeautify_javascript']

let g:airline#extensions#tabline#enabled = 1
