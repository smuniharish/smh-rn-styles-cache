const { execSync } = require('child_process');
const glob = require('fast-glob');

// Find all .js files in the commonjs and module folders
const files = [
  ...glob.sync('./lib/commonjs/**/*.js'),
  ...glob.sync('./lib/module/**/*.js'),
];

// Minify each file using terser
files.forEach((file) => {
  try {
    execSync(`npx terser ${file} --output ${file} --compress --mangle`, {
      stdio: 'inherit',
    });
    console.log(`Minified: ${file}`);
  } catch (err) {
    console.error(`Error minifying ${file}:`, err);
  }
});

console.log('Minification complete!');