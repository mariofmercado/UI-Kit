const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const runSequence = require('run-sequence');
const fs = require('fs');
const fsExt = require('fs-extra')
const path = require('path');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const stripCssComments = require('gulp-strip-css-comments');
const removeEmptyLines = require('gulp-remove-empty-lines');
const fileExtension = require('file-extension');

gulp.task( 'allHtml' , allHtmlFn );
gulp.task( 'styles', styleFn );
gulp.task( 'watch' , watchFn );
gulp.task( 'serve' , serveFn );
gulp.task( 'default' , ['serve','watch'] );
gulp.task( 'js' , jsFn );

/*======================================
-- GENERAL: Variables
======================================*/

var pugDocDitectory = 'src/pug/doc/',
stylesDirectory = 'src/sass/',
jsDirectory = 'src/js/',
pugUtilities = ['src/pug/components/*.pug','src/pug/partials/*.pug','src/pug/layouts/*.pug','src/pug/mixins/*.pug'],
doc = 'web/',
configOutputStyle = 'expanded',
minifyJs = false,
dev = true,
filesWatch = {};
filesWatch['pug'] = [];
filesWatch['scss'] = [];

/*======================================
-- PUG: Acciones para archivos pug
======================================*/
/*
* Inicializa compileAllPugFiles
*/
function allHtmlFn(){
	compileAllPugFiles(pugDocDitectory);
}
/*
* Busca archivos pug en un directorio especifico para compilar
* @param {String} directorio que se quiere verificar
*/
function compileAllPugFiles(pathparam){
	fs.readdirSync(pathparam)
	.filter(function(file){
		var directoryConfirm = fs.statSync(path.join(pathparam, file)).isDirectory();
		if(directoryConfirm){
			compileAllPugFiles(path.join(pathparam, file))
		}else{
			var originalPath = path.join(pathparam, file),
			replaceParentDirectory = originalPath.replace(pugDocDitectory,''),
			finalPath = doc+replaceParentDirectory,
			destDirectory = finalPath.replace(file,'');
			if( fileExtension(file) === 'pug' )
				complilePugFile(path.join(pathparam, file) , destDirectory);
		}
	});
}
/*
* Crea el arreglo de archivos que seran observados por gulp watch
* @param {String} directorio que se quiere verificar
* @param {String} Key de filesWatch
*/
function getAllFilesFromDirectory(parentDirectory,objPush){
	fs.readdirSync(parentDirectory)
	.filter(function(file){
		var directoryConfirm = fs.statSync(path.join(parentDirectory, file)).isDirectory();
		if(directoryConfirm){
			getAllFilesFromDirectory(path.join(parentDirectory, file), objPush);
		}else{
			if( fileExtension(file) === 'pug' )
				filesWatch[objPush].push(path.join(parentDirectory, file));
		}
	});
	return filesWatch[objPush];
}
/*
* Crea la ruta de destribucion de un solo archivo pug
* @param {String} Archivo pug que se va a complilar
*/
function setPugFileCompile(file){
	var pathSplitFromDirectory = file.split(pugDocDitectory),
	pathSplitFiles = pathSplitFromDirectory[1].split('/'),
	destFile = doc+pathSplitFromDirectory.pop();
	complilePugFile( file, destFile.replace( pathSplitFiles.pop(), '') );
}
/*
* Compila archivos pug a html
* @param {string} Archivo que se va a compilar
* @param {string} Destino del archivo final
*/
function complilePugFile(file,_dest){
	gulp.src(file)
	.pipe(plumber())
	.pipe(pug({pretty:true}))
	.pipe(gulp.dest(_dest));
}
/*======================================
-- SCSS: Acciones para archivos scss
======================================*/
/*
* Crea la hoja de estilos
*/
function styleFn(){
	gulp.src(stylesDirectory + '*.scss')
	.pipe(sass({
		outputStyle: configOutputStyle
	}).on('error', sass.logError))
	.pipe(autoprefixer({
		cascade: false
	}))
	.pipe(stripCssComments())
	.pipe(removeEmptyLines({
		removeComments: true
	}))
	.pipe(gulp.dest(doc+'assets'+'/css'));
}
/*======================================
-- JS: Acciones para archivos js
======================================*/
/*
* Disribuye los archivos javascript
*/
function jsFn(){
	gulp.src(jsDirectory + '*.js')
	.pipe( gulpif( !dev , uglify() ) )
	.pipe(plumber())
	.pipe(gulp.dest(doc+'assets'+'/js'));
}
function GenOneJsFile(file){
	gulp.src(file)
	.pipe(plumber())
	.pipe(gulp.dest(doc+'assets'+'/js'));
}
/*======================================
-- GENERAL: Acciones
======================================*/
/*
* Inicia el servidor local
*/
function serveFn(){
	runSequence(['allHtml','styles','js'],function(){
		browserSync.init({
			server: {
				baseDir: doc
			}
		});
	})
}
/*
* watch
*/
function watchFn(){
	//--- watch scss files
	gulp.watch(stylesDirectory+'**/*.scss',function(){
		runSequence('styles',function(){
			browserSync.reload();
		});
	});
	//--- watch pug elements
	gulp.watch(pugUtilities,function(event){
		runSequence('allHtml',function(){
			browserSync.reload();
		});
	});
	//--- watch pug sections
	gulp.watch( getAllFilesFromDirectory(pugDocDitectory,'pug') ,function(event){
		setPugFileCompile(event.path);
		browserSync.reload();
	});
	//--- watch js files
	gulp.watch( jsDirectory + '**/*.js' , function(event){
		GenOneJsFile(event.path);
		browserSync.reload();
	})
}
