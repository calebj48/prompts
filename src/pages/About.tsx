import { Link } from 'react-router-dom';

export function About() {
  return (
    <article className="about-page">
      <h1>A place to begin.</h1>

      <p>
        <strong>The Blank Page</strong> is a daily creative writing prompt engine. One prompt,
        every day. You show up, you write something, and the page fills itself. That's the whole
        idea.
      </p>

      <p>
        Most writing advice talks about craft — voice, structure, tension, revision. All of it
        matters. But the thing that matters more, the thing no one can teach you, is the habit of
        beginning. The willingness to sit down with a blank page and not run from it.
      </p>

      <p>
        <strong>Daily writing practice</strong> isn't about producing masterpieces. It's about
        keeping the muscle warm. It's about learning what your mind does when you give it a prompt
        and a little time. It's about the accumulation of days — each one unremarkable on its own,
        each one essential in aggregate.
      </p>

      <p>
        The prompts here are written to have some literary quality of their own. They're not
        journaling exercises. They're not "write about your favorite memory." They're written to
        create friction in the right places — a specific tension, an image, a moral situation —
        and then get out of your way.
      </p>

      <p>
        <strong>No account required to start writing.</strong> Guest sessions save locally to your
        browser. Create an account to persist your streak and access your archive from anywhere.
      </p>

      <p>
        Write every day. Or don't. But when you're ready to begin, the page is here.
      </p>

      <div style={{ marginTop: '3rem' }}>
        <Link to="/write" className="btn-primary">
          Start writing
        </Link>
      </div>
    </article>
  );
}
