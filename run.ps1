cd $PSScriptRoot\www
Start-Process py -ArgumentList "-m pynetworktables2js", "--port 2539", "--robot roborio-2539-frc.local" -NoNewWindow
cd ..
npm start
Stop-Process -processname py
