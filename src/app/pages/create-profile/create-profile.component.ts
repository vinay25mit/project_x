// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router';
// import { ProfileService } from '../../services/profile.service';

// @Component({
//   selector: 'app-create-profile',
//   templateUrl: './create-profile.component.html',
//   styleUrls: ['./create-profile.component.css'],
// })
// export class CreateProfileComponent implements OnInit {
//   profileForm: FormGroup;
//   role: string =" " ;

//   constructor(private fb: FormBuilder, private authService: AuthService, private profileService: ProfileService, private router: Router) {
//     this.role = this.authService.getUserRole()?? ""; // Get user role from token

//     // Define form based on role
//     if (this.role === 'job_seeker') {
//       this.profileForm = this.fb.group({
//         name: ['', Validators.required],
//         email: ['', [Validators.required, Validators.email]],
//         password: ['', Validators.required],
//         skills: ['', Validators.required],
//         preference: this.fb.group({
//           location: ['', Validators.required],
//           role: ['', Validators.required],
//         }),
//         experience: ['', Validators.required],
//         resume: ['', Validators.required],
//       });
//     } else {
//       this.profileForm = this.fb.group({
//         email: ['', [Validators.required, Validators.email]],
//         password: ['', Validators.required],
//         companyName: ['', Validators.required],
//         companyDescription: ['', Validators.required],
//         preference: this.fb.group({
//           requiredSkils: ['', Validators.required],
//           salary: this.fb.group({
//             min: ['', Validators.required],
//             max: ['', Validators.required],
//           }),
//         }),
//       });
//     }
//   }

//   ngOnInit(): void {}

//   onSubmit(): void {
//     if (this.profileForm.valid) {
//       if (this.role === 'job_seeker') {
//         this.profileService.createJobSeekerProfile(this.profileForm.value).subscribe(() => {
//           this.router.navigate(['/job-seeker-dashboard']);
//         });
//       } else {
//         this.profileService.createEmployerProfile(this.profileForm.value).subscribe(() => {
//           this.router.navigate(['/employer-dashboard']);
//         });
//       }
//     }
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';

// @Component({
//   selector: 'app-create-profile',
//   templateUrl: './create-profile.component.html',
//   styleUrls: ['./create-profile.component.css']
// })
// export class CreateProfileComponent implements OnInit {
//   profileForm!: FormGroup;
//   role!: string;
//   selectedFile: File | null = null;

//   constructor(private fb: FormBuilder, private authService: AuthService) {}

//   ngOnInit(): void {
//     this.role = this.authService.getUserRole() ?? '';

//     if (this.role === 'job_seeker') {
//       this.profileForm = this.fb.group({
//         name: ['', Validators.required],
//         email: ['', [Validators.required, Validators.email]],
//         password: ['', Validators.required],
//         skills: this.fb.array([], Validators.required),
//         locations: this.fb.array([], Validators.required),
//         roles: this.fb.array([], Validators.required),
//         experience: ['', [Validators.required, Validators.min(0)]],
//         resume: [null, Validators.required], // Resume as file
//       });
//     }
//   }

//   // Getter methods for FormArrays
//   get skills() {
//     return this.profileForm.get('skills') as FormArray;
//   }

//   get locations() {
//     return this.profileForm.get('locations') as FormArray;
//   }

//   get roles() {
//     return this.profileForm.get('roles') as FormArray;
//   }

//   // Add items to arrays
//   addSkill() {
//     this.skills.push(this.fb.control('', Validators.required));
//   }

//   addLocation() {
//     this.locations.push(this.fb.control('', Validators.required));
//   }

//   addRole() {
//     this.roles.push(this.fb.control('', Validators.required));
//   }

//   // Remove items from arrays
//   removeSkill(index: number) {
//     this.skills.removeAt(index);
//   }

//   removeLocation(index: number) {
//     this.locations.removeAt(index);
//   }

//   removeRole(index: number) {
//     this.roles.removeAt(index);
//   }

//   onFileSelected(event: any): void {
//     const file: File = event.target.files[0];
//     if (file) {
//         this.selectedFile = file;  
//         this.profileForm.patchValue({ resume: file }); 
//     }
// }

// onSubmit(): void {
//   if (this.profileForm.invalid || !this.selectedFile) {
//     alert("Please fill all required fields and upload a resume.");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("name", this.profileForm.get("name")?.value);
//   formData.append("email", this.profileForm.get("email")?.value);
//   formData.append("password", this.profileForm.get("password")?.value);
//   formData.append("skills", JSON.stringify(this.profileForm.get("skills")?.value));
//   formData.append("locations", JSON.stringify(this.profileForm.get("locations")?.value));
//   formData.append("roles", JSON.stringify(this.profileForm.get("roles")?.value));
//   formData.append("experience", this.profileForm.get("experience")?.value);
//   formData.append("resume", this.selectedFile);

//   const token = localStorage.getItem("token")??""; // Retrieve token

//   this.authService.createProfile(formData, token).subscribe(
//     (response: any) => {
//       console.log("Profile created successfully:", response);
//       alert("Profile created successfully!");
//     },
//     (error: any) => {
//       console.error("Error creating profile:", error);
//       alert("Error creating profile. Please try again.");
//     }
//   );
// }}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {
  profileForm!: FormGroup;
  role!: string;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.role = this.authService.getUserRole() ?? '';

    if (this.role === 'job_seeker') {
      this.profileForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        skills: this.fb.array([], Validators.required),
        locations: this.fb.array([], Validators.required),
        roles: this.fb.array([], Validators.required),
        experience: ['', [Validators.required, Validators.min(0)]],
        resume: [null, Validators.required], // Resume as file
      });
    } else if (this.role === 'employer') {
      this.profileForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        companyName: ['', Validators.required],
        companyDescription: ['', Validators.required],
        requiredSkills: this.fb.array([], Validators.required),
        salary: this.fb.group({
          min: ['', [Validators.required, Validators.min(0)]],
          max: ['', [Validators.required, Validators.min(0)]],
        }),
      });
    }
  }

  // Getter methods for FormArrays
  get skills() {
    return this.profileForm.get('skills') as FormArray;
  }

  get locations() {
    return this.profileForm.get('locations') as FormArray;
  }

  get roles() {
    return this.profileForm.get('roles') as FormArray;
  }

  get requiredSkills() {
    return this.profileForm.get('requiredSkills') as FormArray;
  }

  // Add items to arrays
  addSkill() {
    this.skills.push(this.fb.control('', Validators.required));
  }

  addLocation() {
    this.locations.push(this.fb.control('', Validators.required));
  }

  addRole() {
    this.roles.push(this.fb.control('', Validators.required));
  }

  addRequiredSkill() {
    this.requiredSkills.push(this.fb.control('', Validators.required));
  }

  // Remove items from arrays
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  removeLocation(index: number) {
    this.locations.removeAt(index);
  }

  removeRole(index: number) {
    this.roles.removeAt(index);
  }

  removeRequiredSkill(index: number) {
    this.requiredSkills.removeAt(index);
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
        this.selectedFile = file;  
        this.profileForm.patchValue({ resume: file }); 
    }
  }

  // onSubmit(): void {
  //   if (this.profileForm.invalid || (this.role === 'job_seeker' && !this.selectedFile)) {
  //     alert("Please fill all required fields and upload a resume.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   if (this.role === 'job_seeker') {
  //     formData.append("name", this.profileForm.get("name")?.value);
  //     formData.append("email", this.profileForm.get("email")?.value);
  //     formData.append("password", this.profileForm.get("password")?.value);
  //     formData.append("skills", JSON.stringify(this.profileForm.get("skills")?.value));
  //     formData.append("locations", JSON.stringify(this.profileForm.get("locations")?.value));
  //     formData.append("roles", JSON.stringify(this.profileForm.get("roles")?.value));
  //     formData.append("experience", this.profileForm.get("experience")?.value);
  //     formData.append("resume", this.selectedFile as File);
  //   } else if (this.role === 'employer') {
  //     formData.append("email", this.profileForm.get("email")?.value);
  //     formData.append("password", this.profileForm.get("password")?.value);
  //     formData.append("companyName", this.profileForm.get("companyName")?.value);
  //     formData.append("companyDescription", this.profileForm.get("companyDescription")?.value);
  //     formData.append("requiredSkills", JSON.stringify(this.profileForm.get("requiredSkills")?.value));
  //     formData.append("salary", JSON.stringify(this.profileForm.get("salary")?.value));
  //   }

  //   const token = localStorage.getItem("token") ?? ""; // Retrieve token

  //   this.authService.createProfile(formData, token).subscribe(
  //     (response: any) => {
  //       console.log("Profile created successfully:", response);
  //       alert("Profile created successfully!");
  //     },
  //     (error: any) => {
  //       console.error("Error creating profile:", error);
  //       alert("Error creating profile. Please try again.");
  //     }
  //   );
  // }
  onSubmit(): void {
    if (this.profileForm.invalid) {
      alert("Please fill all required fields.");
      return;
    }
  
    const token = localStorage.getItem("token") ?? ""; // Retrieve token
  
    let requestData:any;
  
    if (this.role === 'job_seeker') {
      const formData = new FormData();
      formData.append("name", this.profileForm.get("name")?.value);
      formData.append("email", this.profileForm.get("email")?.value);
      formData.append("password", this.profileForm.get("password")?.value);
      formData.append("skills", JSON.stringify(this.profileForm.get("skills")?.value));
      formData.append("locations", JSON.stringify(this.profileForm.get("locations")?.value));
      formData.append("roles", JSON.stringify(this.profileForm.get("roles")?.value));
      formData.append("experience", this.profileForm.get("experience")?.value);
      formData.append("resume", this.selectedFile as File);
  
      requestData = formData;
    } else if (this.role === 'employer') {
      requestData = {
        email: this.profileForm.get("email")?.value,
        password: this.profileForm.get("password")?.value,
        companyName: this.profileForm.get("companyName")?.value,
        companyDescription: this.profileForm.get("companyDescription")?.value,
        preference: {
          requiredSkils: this.profileForm.get("requiredSkills")?.value,
          salary: {
            min: this.profileForm.get("salary.min")?.value,
            max: this.profileForm.get("salary.max")?.value
          }
        }
      };
    }
  
    this.authService.createEProfile(requestData, token).subscribe(
      (response: any) => {
        console.log("Profile created successfully:", response);
        alert("Profile created successfully!");
      },
      (error: any) => {
        console.error("Error creating profile:", error);
        alert("Error creating profile. Please try again.");
      }
    );
  }
  
}
