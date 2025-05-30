# Use Case Tables - UrbanCraft REAL ESTATE Management System

## 1. Authentication Use Cases

### 1.1 User Registration

| **Use Case ID** | UC-001 |
|-----------------|--------|
| **Use Case Name** | User Registration |
| **Actor** | User (Buyer/Seller/Agent) |
| **Pre-condition** | • Unique email address<br>• Valid password (min 8 characters)<br>• Selected user role |
| **Post-condition** | • User account created in database<br>• JWT token generated and returned<br>• User redirected to questionnaire |
| **Description** | 1. User navigates to sign-up page<br>2. User enters name, email, password<br>3. User selects role (Buyer/Seller/Agent)<br>4. User answers role-specific questions<br>5. System validates email uniqueness<br>6. System hashes password using bcrypt<br>7. System creates user record in database<br>8. System generates JWT token<br>9. System returns success response with token |

### 1.2 User Login

| **Use Case ID** | UC-002 |
|-----------------|--------|
| **Use Case Name** | User Login |
| **Actor** | User (All roles) |
| **Pre-condition** | • Valid registered email<br>• Correct password |
| **Post-condition** | • JWT token generated<br>• User authenticated<br>• Redirected to role-based dashboard |
| **Description** | 1. User enters email and password<br>2. System validates credentials against database<br>3. System verifies password hash<br>4. System generates JWT token with user role<br>5. System returns token and user data<br>6. Frontend stores token in localStorage<br>7. User redirected to appropriate dashboard |

### 1.3 Social Login

| **Use Case ID** | UC-003 |
|-----------------|--------|
| **Use Case Name** | Social Media Login |
| **Actor** | User (All roles) |
| **Pre-condition** | • Valid Google/Facebook/Apple account<br>• Email verification |
| **Post-condition** | • User authenticated via social provider<br>• Account linked or created<br>• JWT token generated |
| **Description** | 1. User clicks social login button<br>2. System redirects to social provider<br>3. User authenticates with provider<br>4. Provider returns user profile data<br>5. System verifies email with API<br>6. System creates or links account<br>7. System generates JWT token<br>8. User redirected to dashboard |

## 2. Buyer Use Cases

### 2.1 Search Properties

| **Use Case ID** | UC-101 |
|-----------------|--------|
| **Use Case Name** | Search Properties |
| **Actor** | Buyer |
| **Pre-condition** | • User logged in as Buyer<br>• Properties exist in database |
| **Post-condition** | • Filtered property list displayed<br>• Search criteria saved |
| **Description** | 1. Buyer accesses property search page<br>2. Buyer sets search filters (location, price, beds, baths, type)<br>3. System queries database with filters<br>4. System returns matching properties with images<br>5. System displays paginated results<br>6. Buyer can save search criteria<br>7. System tracks search behavior for recommendations |

### 2.2 View Property Details

| **Use Case ID** | UC-102 |
|-----------------|--------|
| **Use Case Name** | View Property Details |
| **Actor** | Buyer |
| **Pre-condition** | • User logged in as Buyer<br>• Property exists and is active |
| **Post-condition** | • Complete property information displayed<br>• Related properties shown |
| **Description** | 1. Buyer clicks on property from search results<br>2. System retrieves complete property data<br>3. System loads property images and details<br>4. System displays agent information<br>5. System shows similar properties<br>6. Buyer can view location on map<br>7. System tracks property view for analytics |

### 2.3 Request Property Tour

| **Use Case ID** | UC-103 |
|-----------------|--------|
| **Use Case Name** | Request Property Tour |
| **Actor** | Buyer |
| **Pre-condition** | • User logged in as Buyer<br>• Property available for tours<br>• Valid contact information |
| **Post-condition** | • Tour request created<br>• Notifications sent to seller/agent<br>• Confirmation email sent |
| **Description** | 1. Buyer selects tour type (in-person/virtual)<br>2. Buyer chooses preferred date and time<br>3. Buyer provides visitor count and special requirements<br>4. System creates tour request record<br>5. System sends notification to property agent<br>6. System sends email confirmation to buyer<br>7. System updates tour availability calendar |

### 2.4 Chat with Agent

| **Use Case ID** | UC-104 |
|-----------------|--------|
| **Use Case Name** | Chat with Agent |
| **Actor** | Buyer, Agent |
| **Pre-condition** | • Both users logged in<br>• Agent assigned to property or buyer |
| **Post-condition** | • Real-time conversation established<br>• Message history saved |
| **Description** | 1. Buyer initiates chat with agent<br>2. System establishes socket connection<br>3. Messages sent via real-time websocket<br>4. System stores messages in database<br>5. System shows online/offline status<br>6. System sends push notifications for new messages<br>7. System maintains conversation history |

### 2.5 Save Favorites

| **Use Case ID** | UC-105 |
|-----------------|--------|
| **Use Case Name** | Save Property to Favorites |
| **Actor** | Buyer |
| **Pre-condition** | • User logged in as Buyer<br>• Property exists |
| **Post-condition** | • Property added to favorites list<br>• Quick access available |
| **Description** | 1. Buyer clicks favorite button on property<br>2. System checks if property already favorited<br>3. System adds/removes property from favorites<br>4. System updates favorites count<br>5. System provides visual feedback<br>6. Buyer can access favorites from profile<br>7. System sends alerts for favorited property updates |

### 2.6 Manage Profile

| **Use Case ID** | UC-106 |
|-----------------|--------|
| **Use Case Name** | Manage Buyer Profile |
| **Actor** | Buyer |
| **Pre-condition** | • User logged in as Buyer |
| **Post-condition** | • Profile information updated<br>• Preferences saved |
| **Description** | 1. Buyer accesses account settings<br>2. Buyer updates personal information<br>3. Buyer uploads profile image<br>4. Buyer sets notification preferences<br>5. Buyer assigns preferred agent<br>6. System validates and saves changes<br>7. System confirms update success |

## 3. Seller Use Cases

### 3.1 Create Property Listing

| **Use Case ID** | UC-201 |
|-----------------|--------|
| **Use Case Name** | Create Property Listing |
| **Actor** | Seller |
| **Pre-condition** | • User logged in as Seller<br>• Valid property information |
| **Post-condition** | • Property listing created<br>• Images uploaded<br>• Listing pending approval |
| **Description** | 1. Seller accesses create listing page<br>2. Seller enters property details (title, description, price, beds, baths, sqft)<br>3. Seller selects category and location<br>4. Seller uploads property images<br>5. Seller sets primary image<br>6. System validates all required fields<br>7. System creates property record<br>8. System sends for admin approval |

### 3.2 Upload Property Images

| **Use Case ID** | UC-202 |
|-----------------|--------|
| **Use Case Name** | Upload Property Images |
| **Actor** | Seller |
| **Pre-condition** | • User logged in as Seller<br>• Property listing exists<br>• Valid image files |
| **Post-condition** | • Images uploaded and stored<br>• Primary image set<br>• Images linked to property |
| **Description** | 1. Seller selects multiple image files<br>2. System validates file types and sizes<br>3. System uploads images to cloud storage<br>4. System creates image records in database<br>5. Seller sets primary display image<br>6. System generates thumbnails<br>7. System provides image management interface |

### 3.3 Manage Product Listings

| **Use Case ID** | UC-203 |
|-----------------|--------|
| **Use Case Name** | Manage Property Listings |
| **Actor** | Seller |
| **Pre-condition** | • User logged in as Seller<br>• Seller has existing listings |
| **Post-condition** | • Listings updated or deleted<br>• Status changes reflected |
| **Description** | 1. Seller views all their property listings<br>2. Seller can edit property details<br>3. Seller can update pricing<br>4. Seller can change listing status<br>5. Seller can delete listings<br>6. System tracks all changes<br>7. System notifies interested buyers of updates |

### 3.4 Handle Tour Requests

| **Use Case ID** | UC-204 |
|-----------------|--------|
| **Use Case Name** | Handle Tour Requests |
| **Actor** | Seller |
| **Pre-condition** | • User logged in as Seller<br>• Tour requests exist for seller's properties |
| **Post-condition** | • Tour requests approved/declined<br>• Notifications sent to buyers |
| **Description** | 1. Seller receives tour request notification<br>2. Seller reviews request details<br>3. Seller checks availability calendar<br>4. Seller approves or declines request<br>5. System sends confirmation to buyer<br>6. System updates tour calendar<br>7. System sends reminder notifications |

### 3.5 Chat with Agents

| **Use Case ID** | UC-205 |
|-----------------|--------|
| **Use Case Name** | Chat with Agents |
| **Actor** | Seller, Agent |
| **Pre-condition** | • Both users logged in<br>• Agent relationship established |
| **Post-condition** | • Communication channel established<br>• Collaboration facilitated |
| **Description** | 1. Seller initiates chat with assigned agent<br>2. System establishes real-time connection<br>3. Messages exchanged instantly<br>4. System stores conversation history<br>5. System enables file sharing<br>6. System tracks response times<br>7. System maintains professional communication log |

### 3.6 Manage Offers

| **Use Case ID** | UC-206 |
|-----------------|--------|
| **Use Case Name** | Manage Property Offers |
| **Actor** | Seller |
| **Pre-condition** | • User logged in as Seller<br>• Offers received on properties |
| **Post-condition** | • Offers reviewed and responded to<br>• Negotiation process managed |
| **Description** | 1. Seller receives offer notification<br>2. Seller reviews offer details<br>3. Seller can accept, reject, or counter offer<br>4. System facilitates negotiation process<br>5. System tracks offer history<br>6. System notifies all parties of decisions<br>7. System manages contract workflows |

### 3.7 View Analytics

| **Use Case ID** | UC-207 |
|-----------------|--------|
| **Use Case Name** | View Property Analytics |
| **Actor** | Seller |
| **Pre-condition** | • User logged in as Seller<br>• Analytics data available |
| **Post-condition** | • Performance metrics displayed<br>• Insights provided |
| **Description** | 1. Seller accesses analytics dashboard<br>2. System displays property view statistics<br>3. System shows inquiry and tour metrics<br>4. System provides price comparison data<br>5. System generates performance reports<br>6. System offers optimization recommendations<br>7. System tracks market trends |

## 4. Agent Use Cases

### 4.1 Coordinate Buyers/Sellers

| **Use Case ID** | UC-301 |
|-----------------|--------|
| **Use Case Name** | Coordinate Buyers and Sellers |
| **Actor** | Agent |
| **Pre-condition** | • User logged in as Agent<br>• Client relationships established |
| **Post-condition** | • Buyers matched to suitable properties<br>• Connections facilitated |
| **Description** | 1. Agent reviews buyer requirements<br>2. Agent searches available properties<br>3. Agent matches buyers to suitable properties<br>4. Agent facilitates introductions<br>5. Agent coordinates meetings<br>6. System tracks match success rates<br>7. Agent manages ongoing relationships |

### 4.2 Facilitate Communications

| **Use Case ID** | UC-302 |
|-----------------|--------|
| **Use Case Name** | Facilitate Communications |
| **Actor** | Agent |
| **Pre-condition** | • User logged in as Agent<br>• Multiple clients assigned |
| **Post-condition** | • Communication channels managed<br>• Information flow coordinated |
| **Description** | 1. Agent manages multi-party communications<br>2. Agent facilitates buyer-seller discussions<br>3. Agent provides professional guidance<br>4. Agent translates technical information<br>5. Agent manages information flow<br>6. System tracks communication efficiency<br>7. Agent ensures regulatory compliance |

### 4.3 Assist Property Tours

| **Use Case ID** | UC-303 |
|-----------------|--------|
| **Use Case Name** | Assist Property Tours |
| **Actor** | Agent |
| **Pre-condition** | • User logged in as Agent<br>• Tour requests scheduled |
| **Post-condition** | • Tours conducted professionally<br>• Follow-up actions planned |
| **Description** | 1. Agent prepares for scheduled tours<br>2. Agent meets clients at property<br>3. Agent conducts professional property tour<br>4. Agent highlights key features<br>5. Agent answers client questions<br>6. Agent collects client feedback<br>7. Agent schedules follow-up activities |

### 4.4 Support Transactions

| **Use Case ID** | UC-304 |
|-----------------|--------|
| **Use Case Name** | Support Real Estate Transactions |
| **Actor** | Agent |
| **Pre-condition** | • User logged in as Agent<br>• Transaction in progress |
| **Post-condition** | • Transaction process guided<br>• Documentation completed |
| **Description** | 1. Agent guides purchase process<br>2. Agent facilitates offer negotiations<br>3. Agent coordinates inspections<br>4. Agent manages documentation<br>5. Agent ensures compliance requirements<br>6. Agent facilitates closing process<br>7. Agent provides post-sale support |

### 4.5 Manage Client Relationships

| **Use Case ID** | UC-305 |
|-----------------|--------|
| **Use Case Name** | Manage Client Relationships |
| **Actor** | Agent |
| **Pre-condition** | • User logged in as Agent<br>• Client database exists |
| **Post-condition** | • Client information maintained<br>• Relationships tracked |
| **Description** | 1. Agent maintains client contact database<br>2. Agent tracks client preferences<br>3. Agent manages communication history<br>4. Agent schedules regular check-ins<br>5. Agent provides market updates<br>6. System generates client reports<br>7. Agent nurtures long-term relationships |

### 4.6 Provide Market Guidance

| **Use Case ID** | UC-306 |
|-----------------|--------|
| **Use Case Name** | Provide Market Guidance |
| **Actor** | Agent |
| **Pre-condition** | • User logged in as Agent<br>• Market data available |
| **Post-condition** | • Expert advice provided<br>• Market insights shared |
| **Description** | 1. Agent analyzes current market trends<br>2. Agent provides pricing guidance<br>3. Agent offers investment advice<br>4. Agent shares market forecasts<br>5. Agent recommends optimal timing<br>6. System provides market analytics<br>7. Agent delivers professional insights |

## 5. Admin Use Cases

### 5.1 Approve Property Listings

| **Use Case ID** | UC-401 |
|-----------------|--------|
| **Use Case Name** | Approve Property Listings |
| **Actor** | Admin |
| **Pre-condition** | • User logged in as Admin<br>• Pending listings exist |
| **Post-condition** | • Listings reviewed and approved/rejected<br>• Notifications sent to sellers |
| **Description** | 1. Admin reviews submitted property listings<br>2. Admin verifies property details<br>3. Admin checks image quality and content<br>4. Admin validates pricing information<br>5. Admin approves or rejects listing<br>6. System sends notification to seller<br>7. Approved listings become public |

### 5.2 Manage Users

| **Use Case ID** | UC-402 |
|-----------------|--------|
| **Use Case Name** | Manage System Users |
| **Actor** | Admin |
| **Pre-condition** | • User logged in as Admin<br>• User accounts exist |
| **Post-condition** | • User accounts managed<br>• Role assignments updated |
| **Description** | 1. Admin views all user accounts<br>2. Admin can modify user roles<br>3. Admin can activate/deactivate accounts<br>4. Admin handles user verification<br>5. Admin resolves user issues<br>6. System tracks admin actions<br>7. Admin maintains user data integrity |

### 5.3 Monitor Platform

| **Use Case ID** | UC-403 |
|-----------------|--------|
| **Use Case Name** | Monitor Platform Activity |
| **Actor** | Admin |
| **Pre-condition** | • User logged in as Admin<br>• Platform activity data available |
| **Post-condition** | • System health monitored<br>• Issues identified and addressed |
| **Description** | 1. Admin monitors system performance<br>2. Admin tracks user activity metrics<br>3. Admin identifies suspicious behavior<br>4. Admin monitors content quality<br>5. Admin ensures platform compliance<br>6. System generates monitoring reports<br>7. Admin takes corrective actions |

### 5.4 Handle Disputes

| **Use Case ID** | UC-404 |
|-----------------|--------|
| **Use Case Name** | Handle User Disputes |
| **Actor** | Admin |
| **Pre-condition** | • User logged in as Admin<br>• Disputes reported |
| **Post-condition** | • Disputes investigated and resolved<br>• Fair outcomes achieved |
| **Description** | 1. Admin receives dispute reports<br>2. Admin investigates all parties<br>3. Admin reviews evidence and communications<br>4. Admin mediates between parties<br>5. Admin makes fair resolutions<br>6. System documents dispute outcomes<br>7. Admin implements corrective measures |

### 5.5 System Configuration

| **Use Case ID** | UC-405 |
|-----------------|--------|
| **Use Case Name** | Configure System Settings |
| **Actor** | Admin |
| **Pre-condition** | • User logged in as Admin<br>• Administrative privileges |
| **Post-condition** | • System settings updated<br>• Configuration changes applied |
| **Description** | 1. Admin accesses system configuration<br>2. Admin updates platform settings<br>3. Admin configures notification rules<br>4. Admin sets business parameters<br>5. Admin manages feature toggles<br>6. System validates configuration changes<br>7. Admin tests updated functionality |

### 5.6 Generate Reports

| **Use Case ID** | UC-406 |
|-----------------|--------|
| **Use Case Name** | Generate Platform Reports |
| **Actor** | Admin |
| **Pre-condition** | • User logged in as Admin<br>• Data available for reporting |
| **Post-condition** | • Comprehensive reports generated<br>• Business insights provided |
| **Description** | 1. Admin selects report parameters<br>2. System aggregates relevant data<br>3. System generates statistical analysis<br>4. System creates visual dashboards<br>5. Admin exports reports in various formats<br>6. System schedules automated reports<br>7. Admin shares insights with stakeholders |

## 6. Additional System Use Cases

### 6.1 User Profiling

| **Use Case ID** | UC-501 |
|-----------------|--------|
| **Use Case Name** | Complete User Profiling |
| **Actor** | User (All roles except Admin) |
| **Pre-condition** | • User logged in<br>• Profile questionnaire available |
| **Post-condition** | • User profile completed<br>• Personalized recommendations enabled |
| **Description** | 1. User accesses profiling questionnaire<br>2. User answers role-specific questions<br>3. User provides preference information<br>4. System validates and stores responses<br>5. System generates user preference profile<br>6. System enables personalized features<br>7. System provides tailored recommendations |

### 6.2 Email Notifications

| **Use Case ID** | UC-502 |
|-----------------|--------|
| **Use Case Name** | Manage Email Notifications |
| **Actor** | System, User |
| **Pre-condition** | • Valid email configuration<br>• User email preferences set |
| **Post-condition** | • Relevant notifications sent<br>• User engagement maintained |
| **Description** | 1. System detects trigger events<br>2. System checks user notification preferences<br>3. System generates personalized email content<br>4. System sends email via mail service<br>5. System tracks email delivery status<br>6. System records user engagement metrics<br>7. System optimizes notification timing |

### 6.3 Real-time Chat System

| **Use Case ID** | UC-503 |
|-----------------|--------|
| **Use Case Name** | Real-time Messaging System |
| **Actor** | User (All roles) |
| **Pre-condition** | • Users logged in<br>• Socket connection established |
| **Post-condition** | • Real-time communication enabled<br>• Message history maintained |
| **Description** | 1. User initiates chat session<br>2. System establishes WebSocket connection<br>3. Messages transmitted in real-time<br>4. System stores message history<br>5. System shows online/offline status<br>6. System enables file sharing<br>7. System maintains conversation threads |

---

## Summary

This document contains **23 detailed use cases** covering all major system functionality:

- **Authentication**: 3 use cases (Registration, Login, Social Login)
- **Buyer Functions**: 6 use cases (Search, View, Tour, Chat, Favorites, Profile)
- **Seller Functions**: 7 use cases (Create, Upload, Manage, Tours, Chat, Offers, Analytics)
- **Agent Functions**: 6 use cases (Coordinate, Facilitate, Tours, Transactions, Relationships, Guidance)
- **Admin Functions**: 6 use cases (Approve, Manage, Monitor, Disputes, Configuration, Reports)
- **System Functions**: 3 use cases (Profiling, Notifications, Chat)

Each use case follows the standard format with:
- **Use Case ID**: Unique identifier
- **Use Case Name**: Descriptive title
- **Actor**: Primary user role
- **Pre-condition**: Required conditions before execution
- **Post-condition**: System state after successful completion
- **Description**: Step-by-step process flow

This comprehensive use case documentation serves as the foundation for system development, testing, and user acceptance criteria.
