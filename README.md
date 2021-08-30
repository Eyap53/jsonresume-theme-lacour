# Custom JSONResume theme

A theme for JSONResume, __in French__, that relies on Bootstrap and FontAwesome.
Initially based on [LinuxBozo](https://github.com/LinuxBozo)'s theme but modified to better fit my needs, particularly in the header and sections displays.

## Usage

You can use [resume-cli](https://github.com/jsonresume/resume-cli) OR [HackMyResume](https://github.com/hacksalot/HackMyResume) (*deprecated*) to obtain your resume.

### Installation des outils
 * Telecharger resume-cli : 
    - Pour cela, il faut tout d'abord telecharger npm avec nodejs ()
    - puis lancer la commande dans le terminal 'npm install -g resume-cli'.
 * Telecharger git.
 * Telecharger un outil de transfert de html vers pdf. J'utilise wkhtmltopdf içi.
 * Installer le theme : 
    - Ouvrir une invite de commande tel que powershell.
    - Se deplacer dans le bon repertoire avec la commande cd *nom_du_dossier_relatif*.
    - Lancer la commande : git clone --branch=fr_delot https://github.com/Eyap53/jsonresume-theme-lacour.git
    - Lancer cette commande ci permet de se placer directement sur la bonne branche, afin d'éviter un git checkout.
 * Install les dépendances du thème : 
    - Toujours avec git bash, se deplacer dans le bon dossier : 'cd jsonresume-theme-lacour'
    - Lancer l'installation des package : 'npm install'

### Otention du CV :
 * Vérifier que le CV fonctionne comme il faut :
    - Bien vérifier que son nom soit resume.json
    - Lancer la commande dans le terminal : 'resume validate'
    - Si rien ne se passe, c'est que c'est OK.
 * Obtenir votre CV en html : 
    - Toujours être au bon endroit
    - Lancer : 'resume export resume.html --theme jsonresume-theme-bluewhale-fr'

 * A cette étape vérifier que tout vas bien avec le CV en HTML. Puis il faut le passer en pdf (un standard en entreprise !):
    - Etre toujours au bon endroit (idem qe les deux points précédents normalement).
    - Lancer la commande : 'wkhtmltopdf.exe -B 0 -L 0 -R 0 -T 0 -d 300 --viewport-size 1980 resume.html resume.pdf'

Vous devriez avoir obtenu votre CV !

## Tips

As of now, the theme supports the following profiles in the basics.profiles array.

* Facebook
* Github
* Twitter
* Google Plus
* YouTube
* Vimeo
* Linkedin
* Pinterest
* Flickr
* Behance
* Dribbble
* CodePen
* Soundcloud
* Steam
* Reddit
* Tumblr
* Stack Overflow
* Bitbucket
* Gitlab

Every single one of these is optional, and every field in the basics.profiles array **must** be entered without spaces. This theme will try to use the matching `-square` version of the icon from FontAwesome if it doesn't already have support for one of your profiles. If you want support for more social networks, feel free to leave an issue, or even better, submit a pull request. Thanks.

If you want to keep your resume mobile-friendly, please limit the number of profiles to 10, please. No one should have over 10 profiles on their resume anyway.

Every section is optional also. If per se, you do not include the publications array in your resume.json, no publications section will appear.

If you find any other problems with this theme, do feel free to leave an issue. Thanks.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
