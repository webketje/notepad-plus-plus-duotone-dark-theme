<p align="center"><img src="https://notepad-plus-plus.org/images/logo.svg" width="96" height="84" alt="Notepad++ logo"/></p>
<p align="center">
  <a href="https://github.com/webketje/notepad-plus-plus-duotone-dark-theme/releases/latest">
    <img src="https://img.shields.io/github/v/release/webketje/notepad-plus-plus-duotone-dark-theme?style=flat-square"/>
  </a>
</p>
<p align="center">5 clean, duotone <a href="https://notepad-plus-plus.org">Notepad++</a> themes.</p>
<p align="center">Adapted from <a href="https://github.com/sallar/vscode-duotone-dark">VSCode DuoTone Dark</a> color schemes.</p>

---

## Install

Download the latest 7zip or zip release from [Releases](https://github.com/webketje/notepad-plus-plus-duotone-dark-theme/releases/latest) and extract it to your Notepad++ themes directory.
You can also extract the themes somewhere else, start Notepad++ and import them through the <kbd>Settings</kbd> menu, <kbd>Import > Import style theme(s)...</kbd>.

![](assets/install-npp.png)

Alternatively, you can install with command-line by doing:

```batch
git clone https://github.com/webketje/notepad-plus-plus-duotone-dark-theme.git
cd notepad-plus-plus-duotone-dark-theme
copy "%cd%\dist" C:\Workdir\MyApps\Notepad++\themes /is /it
```

## Languages

Currently supports: HTML, XML, YML, PHP, Javascript, JSON, CSS, SCSS, batch, ini
To be added: Python, Markdown, others if popular demand

## Development

You need [NodeJS](https://nodejs.org). Clone the repo, run `npm install`, tweak `theme.xml`, then run `npm run build`. `npm run zip` will also create a ZIP & 7Zip archive in the `/dist` folder, however you will need to install 7-Zip first. 

### Contribution
Please report issues/bugs, feature requests and suggestions for improvements to the [issue tracker](https://github.com/arcticicestudio/nord-notepadplusplus/issues).

<p align="center">Copyright &copy; 2019 webketje</p>

<p align="center">
  <a href="https://github.com/webketje/notepad-plus-plus-duotone-dark-theme/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-5E81AC.svg?style=flat-square"/>
  </a>
</p>