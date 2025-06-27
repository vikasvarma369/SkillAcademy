import aboutMainPage from '../assets/images/about.png';
import apj from "../assets/images/apj.png";
import billGates from "../assets/images/billGates.png";
import nelsonMandela from "../assets/images/nelsonMandela.png";
import steveJobs from "../assets/images/steveJobs.png";
import Layout from '../Layout/Layout';

function Aboutus() {
    return (
        <Layout>
          <div className="flex flex-col items-center  pl-20 pt-20 text-gray-800 dark:text-gray-200">
            <div className="flex items-center flex-col sm:flex-row gap-5 mx-10">
                <section className="sm:w-1/2 w-full space-y-10">
                    <h1 className="text-5xl text-center tracking-wide text-yellow-500 font-semibold">
                        Affordable & Quality Education
                    </h1>
                    <p className="text-xl text-gray-800 dark:text-gray-200">
                        Our goal is to provide the affordable and quality education to the world. 
                        We are providing the platform for the aspiring teachers and students to share
                        their skills, creativity and knowledge to each other to empower and contribute
                        in the growth and wellness of mankind.
                    </p>
                </section>
                <div className="sm:w-1/2 w-full lg:block hidden">
                    <img 
                        src={aboutMainPage}
                        className='drop-shadow-2xl'
                        alt="about main page"
                    />
                </div>
            </div>
            <div className="carousel sm:w-1/2 w-full my-10 mx-auto">
                <div id="slide1" className="carousel-item relative w-full">
                    <div className='flex flex-col items-center justify-center gap-4 px-[15%]'>
                        <img src={apj} className="w-40 rounded-full border-2 border-gray-400" />
                        <p className='text-xl text-gray-800 dark:text-gray-200'>Teaching is a very noble profession that shapes the character, caliber, and future of an individual.</p>
                        <h3 className='text-2xl font-semibold'>APJ Abdul Kalam</h3>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide4" className="btn btn-circle">❮</a> 
                        <a href="#slide2" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                </div> 
                <div id="slide2" className="carousel-item relative w-full">
                      <div className='flex flex-col items-center justify-center gap-4 px-[15%]'>
                        <img src={steveJobs} className="w-40 rounded-full border-2 border-gray-400" />
                        <p className='text-xl text-gray-800 dark:text-gray-200 '>We dont get a chance to do that many things, and every one should be really excellent.</p>
                        <h3 className='text-2xl font-semibold'>Steve Jobs</h3>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">❮</a> 
                        <a href="#slide3" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                </div> 
                <div id="slide3" className="carousel-item relative w-full">
                    <div className='flex flex-col items-center justify-center gap-4 px-[15%]'>
                        <img src={billGates} className="w-40 rounded-full border-2 border-gray-400" />
                        <p className='text-xl text-gray-800 dark:text-gray-200 '>Success is a lousy teacher. It seduces smart people into thinking they can’t lose.</p>
                        <h3 className='text-2xl font-semibold'>Bill Gates</h3>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle">❮</a> 
                        <a href="#slide4" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                </div> 
                <div id="slide4" className="carousel-item relative w-full">
                    <div className='flex flex-col items-center justify-center gap-4 px-[15%]'>
                        <img src={nelsonMandela} className="w-40 rounded-full border-2 border-gray-400" />
                        <p className='text-xl text-gray-800 dark:text-gray-200 '>Education is the most powerful tool you can use to change the world.</p>
                        <h3 className='text-2xl font-semibold'>Nelson Mandela</h3>
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle">❮</a> 
                        <a href="#slide1" className="btn btn-circle">❯</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    );
}

export default Aboutus;
