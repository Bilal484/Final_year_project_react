import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Buy from './pages/BrowseProperties/Buy';
import About from './pages/About';
import Investors from './pages/Services/Investors';
import Sell from './pages/BrowseProperties/Sell';
import Rent from './pages/BrowseProperties/Rent';
import Sub2Deals from './pages/BrowseProperties/Sub2Deals';
import Realtors from './pages/Services/Realtors';
import Developers from './pages/Services/Developers';
import Flippers from './pages/Services/Flippers';
import Contact from './pages/contact';
import Howtowork from './pages/Howtowork';
import Advertise from './pages/Advertise';
import Contractors from './pages/Services/Contractors';
import TransactionCordinator from './pages/Services/TransactionCordinator';
import Wholesaler from './pages/Services/Wholesaler';
import Lenders from './pages/Services/Lenders';
import Blog from './pages/Resources/Blog';
import FAQsPage from './pages/Resources/FAQsPage';
import Guides from './pages/Resources/Guides';
import Login from './pages/Login';
import SignUp from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import LicenseVerification from './pages/LinceVerifications';
import AgentProfile from './pages/RealEstateAgents';
import AgentSearch from './pages/RealEstateAgents/AgentSearch';
import StartOffer from './pages/StartOffer';
import OfferPage from './pages/FinalOffers';
import ProductDetail from './pages/ProductDetail';
import RequestShowing from './pages/RequestShowing';
import AboutYourSelf from './pages/AboutYourSelf';
import RealEstateNews from './pages/RealEstateNews';
import Questionaire from './pages/Questionaire';

// Contractor panel
import ManageServiceContractor from './pages/ManageServiceContractor';
import TaskProgress from './pages/TaskProgress';
import ScheduleProject from './pages/ScheduleProject';
import ReviewManagement from './pages/ReviewManagement';
import ProjectInquiries from './pages/ProjectInquiries';
import ClientCommunication from './pages/ClientCommunication';
import ContractorProduct from './pages/ContractorProduct';


// Realtor Panel
import RealtorPanel from './pages/RealtorPanel';

// User Panel
import Favorites from './pages/UserPanel/Favorites';
import UserSetting from './pages/UserPanel/UserSetting';
import AccountSettings from './pages/UserPanel/AccountSettings';
import OwnerDashboard from './pages/UserPanel/OwnerDashboard';
import SavedSearches from './pages/UserPanel/SavedSearches';
import OpenHouseSchedule from './pages/UserPanel/OpenHouseSchedule';
import Review from './pages/UserPanel/Review';
import Offer from './pages/UserPanel/Offer';
import Appointments from './pages/UserPanel/Appointments';
import Agent from './pages/UserPanel/Agent';

// Seller Panel
import AllTeam from './pages/SellerPanel/AllTeam';
import AllJob from './pages/SellerPanel/AllJob';
import AssociateAgentIndependent from './pages/SellerPanel/AssociateAgentIndependent';
import CandidateHome from './pages/SellerPanel/CandidateHome';
import CareerAgent from './pages/SellerPanel/CareerAgent';
import HVHApply from './pages/SellerPanel/HVHApply';
import AgentThanks from './pages/SellerPanel/AgentThanks/Index';
import MultiStepForm from './pages/SellerPanel/MultiStepForm';
import SuccessfulApply from './pages/SellerPanel/SuccessfulApply';
import JobAlert from './pages/SellerPanel/JobAlert';
import JoinTalentCommunity from './pages/SellerPanel/JoinTalentCommunity';
import SaveJob from './pages/SellerPanel/SaveJob';
import JoinAgent from './pages/SellerPanel/JoinAgent';
import AccountSettingCandidate from './pages/SellerPanel/AccountSettingCandidate';
import SellerProduct from './pages/SellerPanel/SellerProduct';


// Investor Panel
import InvestorPanel from './pages/InvestorPanel';
import TrackRIO from './pages/TrackRIO';
import RealEstateOpportunities from './pages/RealEstateOpportunities';
import AnalyticsPerformace from './pages/AnalyticsPerformace';
import ProductMainDetail from './pages/ProductMainDetail';
import CreateJob from './pages/CreateJob';
import AgentProduct from './pages/AgentProduct';
import BecomeAnAgent from './pages/BecomeAnAgent';
import Careers from './pages/Careers';
import HelpCenter from './pages/HelpCenter';
import AdvertiseFooter from './pages/AdvertiseFooter';
import BlogFooter from './pages/BlogFooter';
import InvestorsFooter from './pages/InvestorsFooter';
import PressFooter from './pages/PressFooter';
import ZnetLife from './pages/ZnetLife';
import DiversityInclusion from './pages/DiversityInclusion';
import CommunityImpact from './pages/CommunityImpact';
import WhyZnet from './pages/whyZnet';
import SingleBlog from './pages/SingleBlog';
import TermandUse from './pages/TermandUse';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ChatPage from './pages/ChatsWithUsers';
import ProductComponent from './pages/ProductComponent';
import ExecutiveLeaders from './components/ExecutiveLeaders';
import ScrollToTop from './components/ScrollToTop';
import TourRequestPage from './pages/TourInPerson';
import OffersPage from './pages/PropertyOffers';
import BidsPage from './pages/BidsPage';

function App() {
    const [userRole, setUserRole] = useState(null); // User role is null initially

    useEffect(() => {
        const role = localStorage.getItem('roles'); // Fetch the role from localStorage
        setUserRole(role || 'guest'); // Default to 'guest' if no role is found
    }, []);

    if (userRole === null) {
        return <div>Loading...</div>; // Show loading until the user role is determined
    }

    return (
        <Router>
            <ScrollToTop />
            <div>
                <Routes>
                    {/* Always show the Home route */}
                    <Route path="/" element={<Home />} />
                    {/* Public Routes */}
                    <Route path="/Login" element={<Login />} />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path="/ForgotPassword" element={<ForgotPassword />} />
                    <Route path="/ResetPassword" element={<ResetPassword />} />
                    <Route path="/ExecutiveLeaders" element={<ExecutiveLeaders />} />

                    {/* Protected Routes */}
                    <>
                        <Route path="/Buy" element={<Buy />} />
                        <Route path="/Sell" element={<Sell />} />
                        <Route path="/Rent" element={<Rent />} />
                        <Route path="/Sub2Deal" element={<Sub2Deals />} />
                        <Route path="/About" element={<About />} />
                        <Route path="/Investors" element={<Investors />} />
                        <Route path="/Realtors" element={<Realtors />} />
                        <Route path="/Developers" element={<Developers />} />
                        <Route path="/Flippers" element={<Flippers />} />
                        <Route path="/Contact" element={<Contact />} />
                        <Route path="/HowtoWork" element={<Howtowork />} />
                        <Route path="/Advertise" element={<Advertise />} />
                        <Route path="/Contractors" element={<Contractors />} />
                        <Route path="/TransactionCordinator" element={<TransactionCordinator />} />
                        <Route path="/Wholesaler" element={<Wholesaler />} />
                        <Route path="/Lenders" element={<Lenders />} />
                        <Route path="/Blog" element={<Blog />} />
                        <Route path="/blog/:id" element={<SingleBlog />} />
                        <Route path="/FAQs" element={<FAQsPage />} />
                        <Route path="/Guides" element={<Guides />} />
                        <Route path="/ProductMainDetail" element={<ProductMainDetail />} />                        <Route path="/Licenese-Verifications" element={<LicenseVerification />} />
                        <Route path="/agents" element={<Agent />} />
                        <Route path="/Final-Offer" element={<OfferPage />} />
                        <Route path="/ProductDetail/:id" element={<ProductDetail />} />
                        <Route path="/RequestShowing" element={<RequestShowing />} />
                        <Route path="/AboutYourSelf" element={<AboutYourSelf />} />
                        <Route path="/Sell/:subCategoryId" element={<Sell />} />
                        <Route path="/Rent/:subCategoryId" element={<Rent />} />
                        <Route path="/sub2-deals/:subCategoryId" element={<Sub2Deals />} />
                        <Route path="/Investors/:subCategoryId" element={<Investors />} />
                        <Route path="/Realtors/:subCategoryId" element={<Realtors />} />
                        <Route path="/Developers/:subCategoryId" element={<Developers />} />
                        <Route path="/Flippers/:subCategoryId" element={<Flippers />} />
                        <Route path="/Contact/:subCategoryId" element={<Contact />} />
                        <Route path="/transaction-coordinators/:subCategoryId" element={<TransactionCordinator />} />
                        <Route path="/Wholesaler/:subCategoryId" element={<Wholesaler />} />
                        <Route path="/Lenders/:subCategoryId" element={<Lenders />} />
                        <Route path="/Blogs/:subCategoryId" element={<Blog />} />
                        <Route path="/FAQs/:subCategoryId" element={<FAQsPage />} />
                        <Route path="/Guides/:subCategoryId" element={<Guides />} />
                        <Route path="/AllJob" element={<AllJob />} />
                        <Route path="/HVHApply/:jobId" element={<HVHApply />} />
                        <Route path="/AgentThanks/:id" element={<AgentThanks />} />
                        <Route path="/MultiStepForm/:id" element={<MultiStepForm />} />
                        <Route path="/SuccessfulApply" element={<SuccessfulApply />} />
                        <Route path="/TermandUse" element={<TermandUse />} />
                        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                        <Route path='/chat' element={<ChatPage />} />
                        <Route path='ProductComponent' element={<ProductComponent />} />



                        {/* Role-Based Protected Routes */}
                        {/* Buyer */}
                        {userRole === '1' && (
                            <>
                                <Route path="/Favorites" element={<Favorites />} />
                                <Route path="/UserSetting" element={<UserSetting />} />
                                <Route path="/AccountSettings" element={<AccountSettings />} />
                                <Route path="/OwnerDashboard" element={<OwnerDashboard />} />
                                {/* <Route path="/SavedSearches" element={<SavedSearches />} /> */}
                                <Route path="/OpenHouseSchedule" element={<OpenHouseSchedule />} />
                                <Route path="/Review" element={<Review />} />
                                <Route path="/Offer" element={<Offer />} />
                                <Route path="/start-an-offer" element={<StartOffer />} />
                                <Route path="/Appointments" element={<Appointments />} />
                                <Route path="/Agent" element={<AgentSearch />} />
                                <Route path="/agents/:id" element={<AgentProfile />} />

                            </>
                        )}
                        {/* Seller */}
                        {userRole === '2' && (
                            <>
                                <Route path="/AllTeam" element={<AllTeam />} />
                                <Route path="/AssociateAgentIndependent" element={<AssociateAgentIndependent />} />
                                <Route path="/CandidateHome" element={<CandidateHome />} />
                                <Route path="/CareerAgent" element={<CareerAgent />} />
                                <Route path="/JobAlert" element={<JobAlert />} />
                                <Route path="/TourRequest" element={<TourRequestPage />} />
                                <Route path="/Property-Offers" element={<OffersPage />} />
                                <Route path="/Property-Bids" element={<BidsPage />} />
                                <Route path="/JoinTalentCommunity" element={<JoinTalentCommunity />} />
                                <Route path="/SaveJob" element={<SaveJob />} />
                                <Route path="/JoinAgent" element={<JoinAgent />} />
                                <Route path="/AccountSettingCandidate" element={<AccountSettingCandidate />} />
                                <Route path="/CreateJob" element={<CreateJob />} />
                                <Route path="/SellerProduct" element={<SellerProduct />} />
                            </>
                        )}
                        {/* Agent */}
                        {userRole === '10' && (
                            <>
                                <Route path="/RealtorPanel" element={<RealtorPanel />} />
                                <Route path="/AccountSettingCandidate" element={<AccountSettingCandidate />} />
                                <Route path="/AgentProduct" element={<AgentProduct />} />
                            </>
                        )}
                        {/* Contractor */}
                        {userRole === '14' && (
                            <>
                                <Route path="/ManageServiceContractor" element={<ManageServiceContractor />} />
                                <Route path="/TaskProgress" element={<TaskProgress />} />
                                <Route path="/ScheduleProject" element={<ScheduleProject />} />
                                <Route path="/ReviewManagement" element={<ReviewManagement />} />
                                <Route path="/ProjectInquiries" element={<ProjectInquiries />} />
                                <Route path="/ClientCommunication" element={<ClientCommunication />} />
                                <Route path="/ContractorProduct" element={<ContractorProduct />} />
                            </>
                        )}
                        {/* Realtor */}
                        {userRole === '15' && (
                            <>
                                <Route path="/RealtorPanel" element={<RealtorPanel />} />
                                <Route path="/RealtorProduct" element={<RealtorPanel />} />
                            </>
                        )}

                        {/* Common Routes for all authenticated users */}
                        <Route path="/InvestorPanel" element={<InvestorPanel />} />
                        <Route path="/TrackRIO" element={<TrackRIO />} />
                        <Route path="/RealEstateOpportunities" element={<RealEstateOpportunities />} />
                        <Route path="/AnalyticsPerformace" element={<AnalyticsPerformace />} />
                    </>

                    {/* Questionaire for All Users */}
                    <Route path="/Questionaire" element={<Questionaire />} />

                    {/* Fallback route for unmatched paths */}
                    <Route path="*" element={<Home />} />

                    {/* Footer pages */}
                    <Route path="/BecomeAnAgent" element={<BecomeAnAgent />} />
                    <Route path="/Careers" element={<Careers />} />
                    <Route path="/HelpCenter" element={<HelpCenter />} />
                    <Route path="/AdvertiseFooter" element={<AdvertiseFooter />} />
                    <Route path="/BlogFooter" element={<BlogFooter />} />
                    <Route path="/InvestorsFooter" element={<InvestorsFooter />} />
                    <Route path="/PressFooter" element={<PressFooter />} />
                    <Route path="/News" element={<RealEstateNews />} />
                    <Route path="/ZnetLife" element={<ZnetLife />} />
                    <Route path="/WhyZnet" element={<WhyZnet />} />
                    <Route path="/DiversityInclusion" element={<DiversityInclusion />} />
                    <Route path="/CommunityImpact" element={<CommunityImpact />} />

                </Routes>
            </div>
        </Router >
    );
}

export default App;
