// Minimal Node.js script to list all windows with titles using PowerShell
import { exec } from 'child_process';

const psCmd = `powershell -Command "Get-Process | Where-Object { $_.MainWindowTitle -ne '' } | Select-Object Id,ProcessName,MainWindowTitle"`;

exec(psCmd, (err, stdout, stderr) => {
  if (err) {
    console.error('PowerShell list error:', err);
    return;
  }
  console.log('==== Current Windows With Titles ====');
  console.log(stdout);
  console.log('=====================================');
});
