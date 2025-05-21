# React API Project

Work in progress project, React front-end with PHP API back-end.

## Configure API

Create file `api/local.config.js`:

```js
export default {
  baseUrl: 'http://localhost/api-v1/',
};
```

- `baseUrl` as `string` define the base server URL for API calls.

On Windows, use command `mklink /j [link name] [original path]` to create a junction from PHP webserver to the `api` folder of this project.

Example:

```sh
cd "C:\xampp\htdocs"
mklink /j "api-v1" "C:\GitHub\react-api-project\api"
```

- Those commands will create the folder `C:\xampp\htdocs\api-v1` pointing to the existing path `C:\GitHub\react-api-project\api`
