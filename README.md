# Outline

#### Frontend

- Three best Ron image. Make a collage and use that image as a new background Image. Some catchy text above the background.
- react-draft for editor.

#### Backend

- Flask (AWS Lambda)
- DynamoDB
- Digitial Ocean Space for storage

#### Post DB structure example

```json
id: 1,
tag: "ron_weasley_defence"
title: "Ron and the horcrux",
author: "name",
author_profile: "link to author any social media(optional)",
text: "Awesome Ron Defense",
flag: true
```

**Two solutions for post addition.**

1. Review by admin before display
2. Instant display with option to flag post to be reviewed later.

**Important considerations**

- Lazy Loading