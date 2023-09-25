import "./mystory.css";
import ContactForm from "../ContactForm";
import Footer from "../Footer";

function MyStoryComponent() {
  return (
    <>
      <div className="story-form-footer-container">
        <div className="my-story-container">
          <h1>Jonathan Wofford</h1>
          <h2>Fullstack Software Engineer</h2>

          <p>
            Jonathan Wofford is a highly accomplished Fullstack Software
            Engineer with a versatile background encompassing technical
            expertise and extensive experience in talent acquisition. His
            dynamic skill set and passion for crafting innovative solutions set
            him apart in the field of software development.
          </p>

          <h4>Professional Background</h4>

          <p>
            Jonathan's journey in the tech industry began with a distinguished
            three-year tenure at Collabera, where he excelled in technical
            recruiting. Specializing in sourcing and placing software engineers,
            Jonathan demonstrated an exceptional ability to decipher complex
            technical requirements and match them with top-tier talent. His
            contributions were instrumental in achieving Presidents Club
            recognition, a testament to his commitment and results-driven
            approach.
          </p>
          <p>
            Before transitioning to software engineering, Jonathan showcased his
            sales acumen as a Sales Executive at bisco Ind. Notably, he was
            recognized as the top incoming sales executive, underscoring his
            capacity to drive revenue and cultivate enduring client
            partnerships.
          </p>
          <h4>Educational Foundation</h4>
          <p>
            Armed with a Bachelor's degree in Marketing from Cal State
            Fullerton, Jonathan brings a unique perspective to his technical
            endeavors. This background equips him with a keen understanding of
            how to effectively communicate and market technological solutions, a
            skill set that complements his software engineering expertise.
          </p>

          <h4>Areas of Expertise</h4>

          <p>
            Jonathan's primary areas of expertise lie in fullstack software
            engineering, encompassing proficiency in both front-end and back-end
            development. His skill set includes but is not limited to:
            Javascript, Python, React/Redux, SQL, Flask, PostGresSQL.
          </p>

          <h4>Philosophy and Approach</h4>

          <p>
            Jonathan adheres to a philosophy rooted in delivering excellence and
            finding fulfillment in the process. This ethos permeates his work,
            resulting in consistently high-quality outcomes and a reputation for
            exceeding expectations.
          </p>

          <h4>Future Endeavors</h4>

          <p>
            Looking forward, Jonathan is driven by a fervent desire to expand
            his technical repertoire and tackle increasingly complex challenges
            as a software engineer. He envisions leveraging his expertise to
            drive innovation, enhance user experiences, and contribute to the
            advancement of cutting-edge technologies.
          </p>
        </div>
        <div className="div-for-picture-and-footer">
          <div className="picture-container">
            <h2>Contact</h2>
            <ContactForm />
          </div>
          <div className="footer-container">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyStoryComponent;
