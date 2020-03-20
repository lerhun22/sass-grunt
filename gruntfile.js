module.exports = function (grunt) {
  
  pkg: grunt.file.readJSON('package.json'),
  // Configuration de Grunt
  
  grunt.initConfig({
    
    sass: {
      dist: {
        options: {
          style: "expanded",
        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['**/*.scss'],
          dest: 'css',
          ext: '.css',
        }],
      },
    },

    postcss: { 
      // Begin Post CSS Plugin
      options: {
        map: true,
        processors: [
          require('pixrem')(),
          require('autoprefixer')({
            browsers: ['last 2 versions']
          }),
          require('cssnano')()
        ]
      },
      dist: {
        src: 'css/style.css'
      }
    },

    cssmin: { 
      // Begin CSS Minify Plugin
      target: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css', '!*.min.css'],
          dest: 'css',
          ext: '.min.css'
        }]
      }
    },

    uglify: {
      // Begin JS Uglify Plugin
      build: {
        src: ['src/*.js'],
        dest: 'js/script.min.js',
      },
    },

    watch: {
      // Compile everything into one task with Watch Plugin
      css: {
        files: '**/*.scss',
        tasks: ['sass', 'postcss', 'cssmin'],
      },
      js: {
        files: '**/*.js',
        tasks: ['uglify'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-postcss')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-watch')

  // Register Grunt tasks
  grunt.registerTask('default', ['watch'])
};
