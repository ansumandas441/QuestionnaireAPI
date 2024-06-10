# Questionnaire Application with Express and strapi cms.

The objective of this project is to create APIs that facilitate the submission of new questionnaires based on selected project types. These APIs should allow users to select a project type, retrieve questions specific to that type, and submit their responses, including text and file uploads.

## Getting started

Requirements: \
    ```Node : v18.20.2```
    ```strapi v4```

Clone the repository:\
   ```git clone https://github.com/ansumandas441/recruitement-assignment.git``` 
   
Enter into the foldar  ```recruitement-assignment/```: \
    ``` cd recruitement-assignment/``` 
    
Install necessary dependencies: \
    run ```npm i```

Install the strapi with: \
    ```mkdir strapi-cms``` \
    ```npx create-strapi-app@latest strapi-project```

Enter the strapi-cms foldar: \
    ```cd strapi-cms/strapi-project```
Run the strapi server (default port 1337): \
    ```nvm run develop```         

Import the relations from the foldar in strapi project:
   https://drive.google.com/file/d/15iBzB3bjUmEHWLBLp0enpCsLiBbQZdO5/view?usp=drive_link

Alternately run the script ```dataInjest.js``` for auto population of data:

Generate API token with custom, with upload plugin permission and for all collections:   

Make ```.env``` and save the API token in parameter ```STRAPI_API_TOKEN```;

Now run the project with ```npm start```:

## Endpoints:
 ```http://localhost:3001/api/questionnaire/getQuestions```  
 ```http://localhost:3001/api/questionnaire/sendAnswers```

 ## Documentation swagger endpoints:
```http://localhost:3001/dev/docs/api-docs```   