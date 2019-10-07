; Script generated by the Inno Setup Script Wizard.
; SEE THE DOCUMENTATION FOR DETAILS ON CREATING INNO SETUP SCRIPT FILES!

#define MyAppName "Otter"
#define MyAppVersion "1.0"
#define MyAppPublisher "B&F"
#define MyAppURL "http://www.auction-tools.co.uk/"
#define MyAppExeName "otter.exe"

[Setup]
; NOTE: The value of AppId uniquely identifies this application. Do not use the same AppId value in installers for other applications.
; (To generate a new GUID, click Tools | Generate GUID inside the IDE.)
AppId={{1A2CB9FC-0997-4EE4-B73F-597B3EC0BA5B}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
;AppVerName={#MyAppName} {#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={autopf}\{#MyAppName}
DisableProgramGroupPage=yes
; Uncomment the following line to run in non administrative install mode (install for current user only.)
;PrivilegesRequired=lowest
OutputBaseFilename=mysetup
Compression=lzma
SolidCompression=yes
WizardStyle=modern

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
Source: "C:\Users\smudge\Documents\Computer Science\nwjs-v0.40.2-win-x64\otter.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\Users\smudge\Documents\Computer Science\nwjs-v0.40.2-win-x64\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "C:\Users\smudge\Documents\Computer Science\elm\otter\semantic\*"; DestDir: "{app}\semantic"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "C:\Users\smudge\Documents\Computer Science\elm\otter\startup\otter.html"; DestDir: "{app}\startup"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "C:\Users\smudge\Documents\Computer Science\elm\otter\startup\otter.png"; DestDir: "{app}\startup"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "C:\Users\smudge\Documents\Computer Science\elm\otter\startup\otter_custom.css"; DestDir: "{app}\startup"; Flags: ignoreversion recursesubdirs createallsubdirs
Source: "C:\Users\smudge\Documents\Computer Science\elm\otter\build\Output\otter.bin"; DestDir: "{app}\bin"; Flags: ignoreversion
Source: "C:\Users\smudge\Documents\Computer Science\elm\otter\build\Output\otter_custom.bin"; DestDir: "{app}\bin"; Flags: ignoreversion
Source: "C:\Users\smudge\Documents\Computer Science\elm\otter\package.json"; DestDir: "{app}"; Flags: ignoreversion
Source: "C:\Users\smudge\Documents\Computer Science\elm\otter\semantic.json"; DestDir: "{app}"; Flags: ignoreversion
; NOTE: Don't use "Flags: ignoreversion" on any shared system files

[Icons]
Name: "{autoprograms}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent

