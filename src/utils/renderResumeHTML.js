// src/utils/renderResumeHTML.js
export function renderResumeHTML(resume) {
    const {
        firstName = '',
        lastName = '',
        jobTitle = '',
        address = '',
        phone = '',
        email = '',
        summary = '',
        experience = [],
        projects = [],
        education = [],
        skills = [],
        themeColor = '#000000',
    } = resume;

    const formatExperience = (exp) => `
    <div class="my-5">
      <h2 class="text-sm font-bold" style="color: ${themeColor};">${exp.title || ''}</h2>
      <h2 class="text-xs flex justify-between">
        <span>${exp.companyName || ''}${exp.companyName && exp.city ? ', ' : ''}${exp.city || ''}${exp.city && exp.state ? ', ' : ''}${exp.state || ''}</span>
        <span>
          ${exp.startDate || ''}${exp.startDate && (exp.currentlyWorking || exp.endDate) ? ' – ' : ''}${exp.currentlyWorking ? 'Present' : exp.endDate || ''}
        </span>
      </h2>
      <div class="text-xs my-2" style="line-height: 1.4;">${exp.workSummary || ''}</div>
    </div>
  `;

    const formatProject = (proj) => `
    <div class="my-5">
      <h2 class="text-sm font-bold" style="color: ${themeColor};">${proj.projectName || ''}</h2>
      <h2 class="text-xs flex justify-between">
        ${proj.techStack ? `<span>Tech Stack: ${proj.techStack.split(',').join(' | ')}</span>` : ''}
      </h2>
      <div class="text-xs my-2" style="line-height: 1.4;">${proj.projectSummary || ''}</div>
    </div>
  `;

    const formatEducation = (edu) => `
    <div class="my-5">
      <h2 class="text-sm font-bold" style="color: ${themeColor};">${edu.universityName || ''}</h2>
      <h2 class="text-xs flex justify-between">
        <span>${edu.degree || ''}${edu.degree && edu.major ? ' in ' : ''}${edu.major || ''}</span>
        <span>${edu.startDate || ''}${edu.startDate && edu.endDate ? ' – ' : ''}${edu.endDate || ''}</span>
      </h2>
      ${edu.grade ? `<div class="text-xs">${edu.gradeType || ''} – ${edu.grade}</div>` : ''}
      <p class="text-xs my-2">${edu.description || ''}</p>
    </div>
  `;

    const formatSkill = (skill) => `
    <div class="ml-3 flex items-center justify-between">
      <ul class="list-disc"><li><span class="text-xs font-normal">${skill.name || skill}</span></li></ul>
    </div>
  `;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Resume PDF</title>
  <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap" rel="stylesheet" />
  <style>
    body { font-family: 'Roboto', sans-serif; background-color: #f3f4f6; margin: 0; padding: 0; }
    #print { background-color: #f3f4f6; border-top: 20px solid ${themeColor}; padding: 2.5rem; margin: 0 auto; max-width: 800px; box-shadow: 0 10px 15px rgba(0,0,0,0.1); }
    .text-center { text-align: center; }
    .font-bold { font-weight: 700; }
    .font-medium { font-weight: 500; }
    .font-normal { font-weight: 400; }
    .text-xs { font-size: 0.75rem; }
    .text-sm { font-size: 0.875rem; }
    .text-xl { font-size: 1.25rem; }
    .my-2 { margin: 0.5rem 0; }
    .my-5 { margin: 1.25rem 0; }
    .my-6 { margin: 1.5rem 0; }
    .p-10 { padding: 2.5rem; }
    .list-disc { list-style-type: disc; padding-left: 1rem; }
    .flex { display: flex; }
    .justify-between { justify-content: space-between; }
    .items-center { align-items: center; }
    .ml-3 { margin-left: 0.75rem; }
    .grid { display: grid; }
    .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
    .gap-3 { gap: 0.75rem; }
    .gap-x-3 { column-gap: 0.75rem; }
    .gap-y-2 { row-gap: 0.5rem; }
    hr { border: none; border-top: 1.5px solid ${themeColor}; }
  </style>
</head>
<body>
  <div id="print">
    <!-- Personal Details -->
    <div>
      <h2 class="font-bold text-xl text-center" style="color: ${themeColor};">${firstName} ${lastName}</h2>
      <h2 class="text-center text-sm font-medium">${jobTitle}</h2>
      <h2 class="text-center font-normal text-xs" style="color: ${themeColor};">${address}</h2>
      <div class="flex justify-between">
        <h2 class="font-normal text-xs" style="color: ${themeColor};">${phone}</h2>
        <h2 class="font-normal text-xs" style="color: ${themeColor};">${email}</h2>
      </div>
      <hr class="my-2" />
    </div>

    <!-- Summary -->
    <p class="text-xs">${summary}</p>

    <!-- Experience -->
    ${experience.length > 0 ? `
      <div class="my-6">
        <div><h2 class="text-center font-bold text-sm mb-2" style="color: ${themeColor};">Professional Experience</h2><hr /></div>
        ${experience.map(formatExperience).join('')}
      </div>
    ` : ''}

    <!-- Projects -->
    ${projects.length > 0 ? `
      <div class="my-6">
        <div><h2 class="text-center font-bold text-sm mb-2" style="color: ${themeColor};">Personal Project</h2><hr /></div>
        ${projects.map(formatProject).join('')}
      </div>
    ` : ''}

    <!-- Education -->
    ${education.length > 0 ? `
      <div class="my-6">
        <div><h2 class="text-center font-bold text-sm mb-2" style="color: ${themeColor};">Education</h2><hr /></div>
        ${education.map(formatEducation).join('')}
      </div>
    ` : ''}

    <!-- Skills -->
    ${skills.length > 0 ? `
      <div class="my-6">
        <div><h2 class="text-center font-bold text-sm mb-2" style="color: ${themeColor};">Skills</h2><hr /></div>
        <div class="grid grid-cols-3 gap-3 my-2">
          ${skills.map(formatSkill).join('')}
        </div>
      </div>
    ` : ''}

  </div>
</body>
</html>`;
}
