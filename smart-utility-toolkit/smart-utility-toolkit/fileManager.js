// fileManager.js
const fs = require('fs');
const fileName = 'test.txt';

console.log('Creating File...');
fs.writeFile(fileName, 'Hello Node.js\n', (err) => {
    if (err) return console.error('Error creating file:', err);
    console.log('File Created');
    
    console.log('Reading File');
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) return console.error('Error reading file:', err);
        console.log(data.trim());
        
        console.log('Updating File...');
        fs.appendFile(fileName, 'Learning FS Module\n', (err) => {
            if (err) return console.error('Error updating file:', err);
            console.log('File Updated');
            
            fs.readFile(fileName, 'utf8', (err, updatedData) => {
                if (err) return console.error('Error reading updated file:', err);
                console.log(updatedData.trim());
                
                console.log('Deleting File...');
                fs.unlink(fileName, (err) => {
                    if (err) return console.error('Error deleting file:', err);
                    console.log('File Deleted');
                });
            });
        });
    });
});
