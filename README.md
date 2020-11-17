# Editmode for React Native

Editmode is a CMS for your mobile app copy. Editmode frees your copy from your codebase, allowing your entire team to manage and collaborate on content from a single place.

## Installation

Use npm to install Editmode:

```
npm install editmode-react-native
```

## Usage

### Step 1: Import the Editmode wrapper and wrap your App within it

```js
import { Editmode } from "editmode-react-native";
  export default function App() {
    return (
      <Editmode projectId={project_id}>
        <App />
      </Editmode>
     )
   }  
);
```

### Step 1a (Optional): Create an Editmode account on Editmode.com and create/import your content 

👉 [Editmode Sign Up](https://editmode.com/users/sign_up) 👈

<hr/>

# Rendering content inside your app

In order to render app copy, you'll need to wrap it in the `<Chunk />` component. 

#### The most basic way to render content is to pass in the identifier of your chunk on the Editmode platform.

```js
import { Chunk } from "editmode-react-native";

function Example() {
  return (
    <section>
      <Chunk identifier="cnk_b6d6754b2cf6c59a7847" />
    </section>
  );
}
```

#### For better readability, you can opt to pass in the content key of your chunk on the Editmode platform.

```js
import { Chunk } from "editmode-react-native";

function Example() {
  return (
    <section>
      <Chunk contentKey="simple_chunk_example" />
    </section>
  );
}
```

#### Use variables to personalize and interpolate the content you're showing.

```js
import { Chunk } from "editmode-react-native";

function Example() {
  return (
    <section>
      <Chunk contentKey="welcome_message" variables={{first_name:"Joe"}} />
    </section>
  );
}
```

<hr/>


# Fallbacks

As you may have inferred, the above examples rely on the Editmode API to serve content. This carries speed and uptime considerations. To address this, you may also specify your own fallback content, in a number of ways.

### Using a resource file

```js

import { defaultChunks } from "./data/defaultChunks";
import { Chunk } from "editmode-react-native";

function Example() {
  return (
    <Editmode projectId={project_id} defaultChunks={defaultChunks} >
      <section>
        {/* The following chunk will first check the content in defaultChunks before hitting the API. */}
        <Chunk identifier="cnk_b6d6754b2cf6c59a7847" />
      </section>
    </Editmode>
  );
}
```

### Specifying default content inline

```js

import { Chunk } from "editmode-react-native";

function Example() {
  return (
    <section>
      {/* The following chunk show the inline content before fetching content from our API. */}
      <Chunk contentKey="welcome_message">Welcome to our app!</Chunk>
    </section>
  );
}
```


#### Adding custom width and height to images
By default every image rendered using Editmode is sized 50px in height and 50px in width. You can override those sizes by passing `imageHeight` and `imageWidth` as props.

```js
function Example() {
  return (
    <section>
      <Editmode projectId="prj_h3Gk3gFVMXbl">
        <Chunk identifier="cnk_14a3902640051246876f" imageHeight={500} imageWidth={200} />
      </Editmode>
    </section>
  );
}
```

Sizes passed through `imageHeight` and `imageWidth` are in pixels.


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://ericclemmons.com/"><img src="https://avatars0.githubusercontent.com/u/15182?v=4?s=40" width="40px;" alt=""/><br /><sub><b>Eric Clemmons</b></sub></a><br /><a href="https://github.com/Editmode-app/editmode-react/commits?author=ericclemmons" title="Documentation">📖</a> <a href="#infra-ericclemmons" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/Editmode-app/editmode-react/commits?author=ericclemmons" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/puuripurii"><img src="https://avatars1.githubusercontent.com/u/26903002?v=4?s=40" width="40px;" alt=""/><br /><sub><b>Jen Villaganas</b></sub></a><br /><a href="https://github.com/Editmode-app/editmode-react/commits?author=puuripurii" title="Code">💻</a></td>
    <td align="center"><a href="http://boseriko.com/"><img src="https://avatars1.githubusercontent.com/u/10940193?v=4?s=40" width="40px;" alt=""/><br /><sub><b>Bos Eriko Reyes</b></sub></a><br /><a href="https://github.com/Editmode-app/editmode-react/commits?author=BosEriko" title="Code">💻</a> <a href="https://github.com/Editmode-app/editmode-react/commits?author=BosEriko" title="Documentation">📖</a> <a href="#infra-BosEriko" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
