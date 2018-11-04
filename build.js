const fs = require('fs');
const path = `${__dirname}/dist/functions`
const files = fs.readdirSync(path);

files.forEach((file) => {
    const filePath = `${path}/${file}`;
    if (filePath.endsWith('.js')) {
        let code = fs.readFileSync(filePath, 'UTF-8');
        Object.keys(process.env).forEach((env) => {

            const envValue = process.env[env];
            const toReplace = `\${process.env.${env}}`;
            code = code.replace(toReplace, envValue);
        });
        
        fs.writeFileSync(filePath, code, 'UTF-8');
    }
});
