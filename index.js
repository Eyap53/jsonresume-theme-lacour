var fs = require('fs');
var _ = require('lodash');
var gravatar = require('gravatar');
var Mustache = require('mustache');

var d = new Date();
var curyear = d.getFullYear();

function getMonth(startDateStr) {
    switch (startDateStr.substr(5, 2)) {
        case '01':
            return "January ";
        case '02':
            return "February ";
        case '03':
            return "March ";
        case '04':
            return "April ";
        case '05':
            return "May ";
        case '06':
            return "June ";
        case '07':
            return "July ";
        case '08':
            return "August ";
        case '09':
            return "September ";
        case '10':
            return "October ";
        case '11':
            return "November ";
        case '12':
            return "December ";
    }
}

function beautifyUrl(url) {
    return url.replace("http://", "").replace("https://", "").replace("www.", "");
}

function getPeriod(startDate, endDate) {
    if (endDate) {
        endDateYear = (endDate || "").substr(0, 4);
        endDateMonth = getMonth(endDate || "");
    } else {
        endDateYear = "Today";
        endDateMonth = "";
    };

    if (startDate) {
        startDateYear = (startDate || "").substr(0, 4);
        startDateMonth = getMonth(startDate || "");

        if (startDateYear == endDateYear) {

            if (startDateMonth == endDateMonth) {
                return startDateMonth + " " + startDateYear.toString();
            }
            else {
                return startDateMonth + " - " + endDateMonth + " " + startDateYear.toString();
            };

        }
        else {
            return startDateMonth + " " + startDateYear.toString() + " - " + endDateMonth + " " + endDateYear.toString();
        };
    }
    else {
        return "";
    };
}

function render(resumeObject) {

    resumeObject.basics.capitalName = resumeObject.basics.name.toUpperCase();
    if (resumeObject.basics && resumeObject.basics.email) {
        resumeObject.basics.gravatar = gravatar.url(resumeObject.basics.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
    }
    if (resumeObject.basics.image || resumeObject.basics.gravatar) {
        resumeObject.photo = resumeObject.basics.image ? resumeObject.basics.image : resumeObject.basics.gravatar;
    }
    if (resumeObject.basics.url) {
        resumeObject.basics.beautifiedUrl = beautifyUrl(resumeObject.basics.url);
    }

    if (resumeObject.basics.profiles && resumeObject.basics.profiles.length) {
        resumeObject.profilesBool = true;
        _.each(resumeObject.basics.profiles, function (p) {
            switch (p.network.toLowerCase()) {
                // special cases
                case "google-plus":
                case "googleplus":
                    p.iconClass = "fa fa-google-plus";
                    break;
                case "flickr":
                case "flicker":
                    p.iconClass = "fa fa-flickr";
                    break;
                case "dribbble":
                case "dribble":
                    p.iconClass = "fa fa-dribbble";
                    break;
                case "codepen":
                    p.iconClass = "fa fa-codepen";
                    break;
                case "soundcloud":
                    p.iconClass = "fa fa-soundcloud";
                    break;
                case "reddit":
                    p.iconClass = "fa fa-reddit";
                    break;
                case "tumblr":
                case "tumbler":
                    p.iconClass = "fa fa-tumblr";
                    break;
                case "stack-overflow":
                case "stackoverflow":
                    p.iconClass = "fa fa-stack-overflow";
                    break;
                case "blog":
                case "rss":
                    p.iconClass = "fa fa-rss";
                    break;
                case "gitlab":
                    p.iconClass = "fa fa-gitlab";
                    break;
                case "keybase":
                    p.iconClass = "fa fa-key";
                    break;
                default:
                    // try to automatically select the icon based on the name
                    p.iconClass = "fa fa-" + p.network.toLowerCase();
            };

            if (p.url) {
                p.beautifiedUrl = beautifyUrl(p.url);
            }

        });
    };

    if (resumeObject.work && resumeObject.work.length) {
        resumeObject.workBool = true;
        _.each(resumeObject.work, function (w) {
            w.period = getPeriod(w.startDate, w.endDate);

            if (w.highlights) {
                if (w.highlights[0]) {
                    if (w.highlights[0] != "") {
                        w.boolHighlights = true;
                    };
                };
            };

            if (w.url) {
                w.beautifiedUrl = beautifyUrl(w.url);
            }
        });
    };

    if (resumeObject.projects && resumeObject.projects.length) {
        resumeObject.projectsBool = true;
        _.each(resumeObject.projects, function (p) {
            p.period = getPeriod(p.startDate, p.endDate);

            if (p.highlights) {
                if (p.highlights[0]) {
                    if (p.highlights[0] != "") {
                        p.boolHighlights = true;
                    }
                }
            }

            if (p.url) {
                p.beautifiedUrl = beautifyUrl(p.url);
            }
        });
    };

    if (resumeObject.volunteer && resumeObject.volunteer.length) {
        resumeObject.volunteerBool = true;
        _.each(resumeObject.volunteer, function (w) {
            w.period = getPeriod(w.startDate, w.endDate);

            if (w.highlights) {
                if (w.highlights[0]) {
                    if (w.highlights[0] != "") {
                        w.boolHighlights = true;
                    }
                }
            }

            if (w.url) {
                w.beautifiedUrl = beautifyUrl(w.url);
            }
        });
    }

    if (resumeObject.education && resumeObject.education.length) {
        if (resumeObject.education[0].institution) {
            resumeObject.educationBool = true;
            _.each(resumeObject.education, function (e) {
                if (!e.area || !e.studyType) {
                    e.educationDetail = (e.area == null ? '' : e.area) + (e.studyType == null ? '' : e.studyType);
                } else {
                    e.educationDetail = e.area + ", " + e.studyType;
                }
                if (e.startDate) {
                    e.startDateYear = e.startDate.substr(0, 4).trim();
                    e.startDateMonth = getMonth(e.startDate || "").trim();
                }
                if (e.endDate) {
                    e.endDateYear = e.endDate.substr(0, 4).trim();
                    e.endDateMonth = getMonth(e.endDate || "").trim();

                    if (e.endDateYear > curyear) {
                        e.endDateYear += " (prévu)";
                    }
                } else {
                    e.endDateYear = "Auj.";
                    e.endDateMonth = "";
                }
                if (e.courses) {
                    if (e.courses[0]) {
                        if (e.courses[0] != "") {
                            e.educationCourses = true;
                        }
                    }
                }
            });
        }
    }

    if (resumeObject.awards && resumeObject.awards.length) {
        if (resumeObject.awards[0].title) {
            resumeObject.awardsBool = true;
            _.each(resumeObject.awards, function (a) {
                a.year = (a.date || "").substr(0, 4);
                a.day = (a.date || "").substr(8, 2);
                a.month = getMonth(a.date || "");

                if (a.url) {
                    a.beautifiedUrl = beautifyUrl(a.url);
                }
            });
        }
    }

    if (resumeObject.publications && resumeObject.publications.length) {
        if (resumeObject.publications[0].name) {
            resumeObject.publicationsBool = true;
            _.each(resumeObject.publications, function (a) {
                a.year = (a.releaseDate || "").substr(0, 4);
                a.day = (a.releaseDate || "").substr(8, 2);
                a.month = getMonth(a.releaseDate || "");

                if (a.url) {
                    a.beautifiedUrl = beautifyUrl(a.url);
                }
            });
        }
    }

    if (resumeObject.skills && resumeObject.skills.length) {
        if (resumeObject.skills[0].name) {
            resumeObject.skillsBool = true;
        }
    }

    if (resumeObject.interests && resumeObject.interests.length) {
        if (resumeObject.interests[0].name) {
            resumeObject.interestsBool = true;
        }
    }

    if (resumeObject.languages && resumeObject.languages.length) {
        if (resumeObject.languages[0].language) {
            resumeObject.languagesBool = true;
        }
    }

    if (resumeObject.references && resumeObject.references.length) {
        if (resumeObject.references[0].name) {
            resumeObject.referencesBool = true;
        }
    }

    resumeObject.css = fs.readFileSync(__dirname + "/style.css", "utf-8");
    resumeObject.printcss = fs.readFileSync(__dirname + "/print.css", "utf-8");
    var theme = fs.readFileSync(__dirname + "/resume.template", "utf8");
    var resumeHTML = Mustache.render(theme, resumeObject);


    return resumeHTML;
};
module.exports = {
    render: render
}
