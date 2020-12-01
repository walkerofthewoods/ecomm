const layout = require('../layout');
const { getError } = require('../../helpers');

// input fields below no longer 'required' for live demo purposes
module.exports = ({ errors }) => {
  return layout({
    content: `
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-one-third">
            <form method="POST">
              <h2 style="color:red">// press Submit for demo access :)</h2>
              <h1 class="title">Sign in</h1>
              <div class="field">
                <label class="label">Email</label>
                <!-- <input required class="input" placeholder="Email" name="email" /> -->
                <input class="input" placeholder="Email" name="email" />
                <p class="help is-danger">${getError(errors, 'email')}</p>
              </div>
              <div class="field">
                <label class="label">Password</label>
                <!-- <input required class="input" placeholder="Password" name="password" type="password" /> -->
                <input class="input" placeholder="Password" name="password" type="password" />
                <p class="help is-danger">${getError(errors, 'password')}</p>
              </div>
              <button class="button is-primary">Submit</button>
            </form>
            <a href="/signup">Need an account? Sign Up</a>
          </div>
        </div>
      </div>
    `
  });
};
