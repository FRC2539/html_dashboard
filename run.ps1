cd c:\Users\Krypton\html_dashboard\www
Start-Process py -ArgumentList "-m pynetworktables2js", "--port 2539", "--dashboard" -NoNewWindow
cd ..
npm start
Stop-Process -processname py
