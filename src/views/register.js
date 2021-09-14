import { html } from '../lib.js';
import { register } from '../api/data.js';

const template = (onSubmit) => html`
<section id="register">
    <div class="pad-large">
        <div class="glass narrow">
            <header class="tab layout">
                <a class="tab-item" href="/login">Login</a>
                <h1 class="tab-item active">Register</h1>
            </header>
            <form @submit=${onSubmit} class="pad-med centered">
                <label class="block centered">Username: <input class="auth-input input" type="text"
                        name="username" /></label>
                <label class="block centered">Email: <input class="auth-input input" type="text" name="email" /></label>
                <label class="block centered">Password: <input class="auth-input input" type="password"
                        name="password" /></label>
                <label class="block centered">Repeat: <input class="auth-input input" type="password"
                        name="repass" /></label>
                <input class="block action cta" type="submit" value="Create Account" />
            </form>
            <footer class="tab-footer">
                Already have an account? <a class="invert" href="/login">Sign in here</a>.
            </footer>
        </div>
    </div>
</section>`;

export async function registerPage(ctx) {
    ctx.render(template(onSubmit));
    
    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const username = formData.get('username');
        const email = formData.get('email'); 
        const password = formData.get('password'); 
        const repass = formData.get('repass'); 

        try {
            if (username == '' || email == '' || password == '') {
                throw new Error('All fields are required')
            }
            if (password != repass) {
                throw new Error('Passwords don\'t match')
            }

            await register(email, username, password);
            ctx.setUserNav();
            ctx.page.redirect('/editor');

        } catch(err) {
            alert(err.message);
        }
    }
}