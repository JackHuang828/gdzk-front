const fs = require('fs');
const path = require('path');

const viewsDir = 'd:/byu/ai/zwrite-vue3/src/views';
let total = 0;

for (const group of fs.readdirSync(viewsDir)) {
  const gPath = path.join(viewsDir, group);
  if (!fs.statSync(gPath).isDirectory()) continue;
  for (const f of fs.readdirSync(gPath)) {
    if (!f.endsWith('.vue')) continue;
    const fPath = path.join(gPath, f);
    let s = fs.readFileSync(fPath, 'utf8');
    const orig = s;

    // 三层 ../ → 两层 ../
    s = s.replace(/from '\.\.\/\.\.\/\.\.\//g, "from '../../");
    s = s.replace(/from "\.\.\/\.\.\/\.\.\//g, 'from "../../');
    s = s.replace(/import '\.\.\/\.\.\/\.\.\//g, "import '../../");
    s = s.replace(/import "\.\.\/\.\.\/\.\.\//g, 'import "../../');

    // composables → hooks
    s = s.replace(/hooks\/composables/g, 'hooks');
    s = s.replace(/assets\/styles/g, 'assets/styles'); // no-op for safety

    if (s !== orig) {
      fs.writeFileSync(fPath, s, 'utf8');
      console.log('Fixed:', group + '/' + f);
      total++;
    }
  }
}
console.log('Total:', total, 'files');
