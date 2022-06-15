import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'select-technologies-dialog',
  templateUrl: './select-technologies-dialog.component.html',
  styleUrls: ['./select-technologies-dialog.component.scss'],
})
export class SelectTechnologiesDialogComponent implements OnInit {
  technologies: string[] = [];
  searchText: string = '';

  constructor(
    public dialogRef: MatDialogRef<SelectTechnologiesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.technologies = this.data.currentTechnologies
      .toString()
      .split(',')
      .map((e: string) => e.trim());

    this.technologies = this.technologies.filter((e) => e != '');
  }

  save() {
    this.dialogRef.close(this.technologies.toString());
  }

  close() {
    this.dialogRef.close(this.data.currentTechnologies.toString());
  }

  toggleChip(chip: string) {
    if (this.isChipSelected(chip)) {
      this.technologies = this.technologies.filter((e) => e != chip);
    } else {
      this.technologies.push(chip);
    }
  }

  isChipSelected(chip: string) {
    return Array.from(this.technologies).indexOf(chip) > -1;
  }

  isSearched(chip: string) {
    let retVal: boolean = true;
    if (this.searchText.trim() === '') {
      retVal = true;
    } else {
      retVal = chip
        .trim()
        .toLowerCase()
        .includes(this.searchText.toLowerCase());
    }

    return retVal;
  }

  programingLanguages: string[] = [
    'C',
    'C++',
    'C#',
    'GO',
    'Java',
    'JavaScript',
    'TypeScript',
    'PhP',
    'Perl',
    'Ruby',
    'Python',
    'Rust',
    'Haskell',
  ];

  frontendDevelopment: string[] = [
    'Vue.js',
    'React',
    'Angular',
    'Bootstrap',
    'Bulma',
    'Sass',
    'HTML',
    'CSS',
    'Materialize',
    'Tailwind',
    'Babel',
  ];

  backendDevelopment: string[] = [
    'nodeJS',
    'Spring Boot',
    'Express',
    'Kafka',
    'Nginx',
    'RabbitMQ',
    '.NET',
    'Django',
    'Electron',
    'Rails',
    'Laravel',
  ];

  mobileAppDevelopment: string[] = [
    'Android',
    'Flutter',
    'Dart',
    'Kotlin',
    'ReactNative',
    'iOS',
    'Swift',
  ];

  aiMl: string[] = [
    'Tensorflow',
    'Pytorch',
    'Pandas',
    'Seaborn',
    'OpenCv',
    'Scikit Learn',
  ];

  database: string[] = [
    'Mongo DB',
    'My SQL',
    'PostgreSQL',
    'Oracle',
    'MariaDB',
    'CouchDB',
  ];

  devops: string[] = [
    'AWS',
    'Docker',
    'Jenkins',
    'GCP',
    'Kubernetes',
    'Bash',
    'CircleCI',
    'TravisCI',
  ];

  testing: string[] = [
    'Cypress',
    'Selenium',
    'Karma',
    'Junit',
    'Jest',
    'Mocha',
  ];

  gameEngines: string[] = ['Unity', 'Unreal Engine'];
}
