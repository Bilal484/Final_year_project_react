# UML 2.0 Diagrams for UrbanCraft Real Estate Management System

## 1. Class Diagrams

### 1.1 User Management Class Diagram

```mermaid
classDiagram
    class User {
        <<abstract>>
        +int user_id
        +String name
        +String email
        +String password_hash
        +String phone
        +DateTime created_at
        +DateTime updated_at
        +Boolean is_active
        +String profile_image
        +register()
        +login()
        +logout()
        +updateProfile()
        +uploadImage()
    }

    class Role {
        +int role_id
        +String role_name
        +String permissions
        +DateTime created_at
        +assignRole(user_id)
        +removeRole(user_id)
    }

    class Buyer {
        +String budget_range
        +String preferred_location
        +String property_type
        +Boolean working_with_realtor
        +Boolean bought_house_before
        +searchProperties()
        +viewPropertyDetails()
        +requestTour()
        +saveFavorites()
        +chatWithAgent()
        +manageProfile()
    }

    class Seller {
        +String company_name
        +String business_type
        +Boolean has_license
        +createListing()
        +uploadImages()
        +manageListing()
        +handleTours()
        +chatWithAgents()
        +manageOffers()
        +viewAnalytics()
    }

    class Agent {
        +String license_number
        +String specialization
        +Float commission_rate
        +String experience_years
        +String service_areas
        +coordinateBuyersSellers()
        +facilitateCommunication()
        +assistTours()
        +supportTransactions()
        +manageRelationships()
        +provideMarketGuidance()
    }

    class Admin {
        +String admin_level
        +String permissions
        +approveListings()
        +manageUsers()
        +monitorPlatform()
        +handleDisputes()
        +systemConfiguration()
        +generateReports()
    }

    User <|-- Buyer
    User <|-- Seller
    User <|-- Agent
    User <|-- Admin
    User "1" --> "1..*" Role : has
```

### 1.2 Property Management Class Diagram

```mermaid
classDiagram
    class Property {
        +int property_id
        +String title
        +String description
        +String location
        +Float price
        +String property_type
        +int bedrooms
        +int bathrooms
        +Float area_sqft
        +String status
        +DateTime listed_date
        +String map_link
        +String embed_link
        +int seller_id
        +int agent_id
        +createListing()
        +updateListing()
        +deleteListing()
        +changeStatus()
    }

    class PropertyImage {
        +int image_id
        +int property_id
        +String image_url
        +String image_type
        +int order_sequence
        +uploadImage()
        +deleteImage()
        +reorderImages()
    }

    class PropertyVideo {
        +int video_id
        +int property_id
        +String video_url
        +String video_type
        +uploadVideo()
        +deleteVideo()
    }

    class Category {
        +int category_id
        +String category_name
        +String description
        +addCategory()
        +updateCategory()
        +deleteCategory()
    }

    class Location {
        +int location_id
        +String city
        +String state
        +String zipcode
        +String country
        +Float latitude
        +Float longitude
        +addLocation()
        +updateLocation()
    }

    class Favorites {
        +int favorite_id
        +int user_id
        +int property_id
        +DateTime added_date
        +addToFavorites()
        +removeFromFavorites()
    }

    Property "1" --> "0..*" PropertyImage : has
    Property "1" --> "0..*" PropertyVideo : has
    Property "1" --> "1" Category : belongs_to
    Property "1" --> "1" Location : located_at
    Property "1" --> "0..*" Favorites : favorited_by
    Seller "1" --> "0..*" Property : owns
    Agent "1" --> "0..*" Property : manages
```

### 1.3 Communication and Transaction Class Diagram

```mermaid
classDiagram
    class Chat {
        +int chat_id
        +int sender_id
        +int receiver_id
        +String message
        +DateTime timestamp
        +Boolean is_read
        +String message_type
        +sendMessage()
        +markAsRead()
        +deleteMessage()
    }

    class Tour {
        +int tour_id
        +int property_id
        +int buyer_id
        +int agent_id
        +String tour_type
        +DateTime scheduled_date
        +String status
        +String special_requirements
        +int visitor_count
        +requestTour()
        +confirmTour()
        +cancelTour()
        +completeTour()
    }

    class Offer {
        +int offer_id
        +int property_id
        +int buyer_id
        +Float offer_amount
        +String terms
        +DateTime offer_date
        +String status
        +DateTime expiry_date
        +submitOffer()
        +acceptOffer()
        +rejectOffer()
        +counterOffer()
    }

    class Transaction {
        +int transaction_id
        +int property_id
        +int buyer_id
        +int seller_id
        +int agent_id
        +Float final_price
        +DateTime closing_date
        +String status
        +String payment_method
        +initiateTransaction()
        +updateStatus()
        +completeTransaction()
        +generateContract()
    }

    class Notification {
        +int notification_id
        +int user_id
        +String title
        +String message
        +String type
        +Boolean is_read
        +DateTime created_at
        +sendNotification()
        +markAsRead()
        +deleteNotification()
    }

    User "1" --> "0..*" Chat : participates
    Property "1" --> "0..*" Tour : has
    Property "1" --> "0..*" Offer : receives
    Property "1" --> "0..1" Transaction : involved_in
    User "1" --> "0..*" Notification : receives
```

## 2. Sequence Diagrams

### 2.1 User Registration Sequence

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant API as API Server
    participant DB as Database
    participant ES as Email Service

    U->>FE: Enter registration details
    FE->>API: POST /api/register
    API->>API: Validate input data
    API->>DB: Check email uniqueness
    DB-->>API: Email availability status
    
    alt Email is unique
        API->>API: Hash password with bcrypt
        API->>DB: Create user record
        DB-->>API: User created successfully
        API->>API: Generate JWT token
        API->>ES: Send welcome email
        ES-->>API: Email sent confirmation
        API-->>FE: Success + JWT token
        FE-->>U: Registration successful, redirect to questionnaire
    else Email exists
        API-->>FE: Email already exists error
        FE-->>U: Display error message
    end
```

### 2.2 Property Search and View Sequence

```mermaid
sequenceDiagram
    participant B as Buyer
    participant FE as Frontend
    participant API as API Server
    participant DB as Database
    participant ES as Email Service

    B->>FE: Enter search criteria
    FE->>API: GET /api/properties/search
    API->>DB: Query properties with filters
    DB-->>API: Matching properties list
    API-->>FE: Properties with images
    FE-->>B: Display search results
    
    B->>FE: Click on property
    FE->>API: GET /api/properties/:id
    API->>DB: Get property details
    DB-->>API: Complete property data
    API->>DB: Get agent information
    DB-->>API: Agent details
    API->>DB: Get similar properties
    DB-->>API: Related properties
    API-->>FE: Complete property information
    FE-->>B: Show property details page
    
    B->>FE: Click favorite button
    FE->>API: POST /api/favorites
    API->>DB: Add to favorites
    DB-->>API: Favorite added
    API-->>FE: Success confirmation
    FE-->>B: Visual feedback
```

### 2.3 Tour Request and Coordination Sequence

```mermaid
sequenceDiagram
    participant B as Buyer
    participant FE as Frontend
    participant API as API Server
    participant DB as Database
    participant NS as Notification Service
    participant A as Agent
    participant S as Seller

    B->>FE: Request tour for property
    FE->>API: POST /api/tours/request
    API->>DB: Create tour request
    DB-->>API: Tour request created
    
    API->>NS: Send notification to agent
    NS->>A: Tour request notification
    API->>NS: Send notification to seller
    NS->>S: Tour request notification
    
    API->>NS: Send confirmation email to buyer
    NS->>B: Tour request confirmation
    API-->>FE: Tour request successful
    FE-->>B: Display confirmation message
    
    A->>FE: Login and view tour requests
    FE->>API: GET /api/tours/pending
    API->>DB: Get pending tours for agent
    DB-->>API: Tour requests list
    API-->>FE: Pending tours
    FE-->>A: Display tour requests
    
    A->>FE: Confirm tour
    FE->>API: PUT /api/tours/:id/confirm
    API->>DB: Update tour status
    DB-->>API: Tour confirmed
    API->>NS: Send confirmation to buyer
    NS->>B: Tour confirmed notification
    API-->>FE: Tour confirmed successfully
    FE-->>A: Show confirmation
```

### 2.4 Chat Communication Sequence

```mermaid
sequenceDiagram
    participant B as Buyer/Seller
    participant FE as Frontend
    participant WS as WebSocket Server
    participant DB as Database
    participant A as Agent

    B->>FE: Open chat with agent
    FE->>WS: Establish socket connection
    WS-->>FE: Connection established
    
    FE->>WS: Join chat room
    WS->>DB: Get chat history
    DB-->>WS: Previous messages
    WS-->>FE: Chat history
    FE-->>B: Display chat interface
    
    B->>FE: Type and send message
    FE->>WS: Send message via socket
    WS->>DB: Store message
    DB-->>WS: Message stored
    
    WS->>A: Real-time message delivery
    WS-->>FE: Message sent confirmation
    FE-->>B: Show message in chat
    
    A->>WS: Send response message
    WS->>DB: Store response
    DB-->>WS: Response stored
    WS->>B: Real-time message delivery
    WS-->>A: Response sent confirmation
```

## 3. Activity Diagrams

### 3.1 Property Listing Creation Activity

```mermaid
flowchart TD
    A[Seller logs in] --> B[Navigate to Create Listing]
    B --> C[Fill property details]
    C --> D[Upload property images]
    D --> E[Upload property videos]
    E --> F[Set pricing and terms]
    F --> G[Select property category]
    G --> H[Add location details]
    H --> I[Review listing information]
    I --> J{All information correct?}
    
    J -->|No| K[Edit information]
    K --> I
    J -->|Yes| L[Submit listing]
    
    L --> M[System validates data]
    M --> N{Validation successful?}
    
    N -->|No| O[Display validation errors]
    O --> K
    N -->|Yes| P[Save to database]
    
    P --> Q[Generate listing ID]
    Q --> R[Send for admin approval]
    R --> S[Send confirmation email]
    S --> T[Notify assigned agent]
    T --> U[Display success message]
    U --> V[End]
```

### 3.2 Property Search and Purchase Activity

```mermaid
flowchart TD
    A[Buyer logs in] --> B[Set search criteria]
    B --> C[Submit search]
    C --> D[System queries database]
    D --> E[Display search results]
    E --> F{Found properties?}
    
    F -->|No| G[Suggest alternative searches]
    G --> B
    F -->|Yes| H[Browse properties]
    
    H --> I[Select property of interest]
    I --> J[View detailed information]
    J --> K{Interested in property?}
    
    K -->|No| L[Return to search results]
    L --> H
    K -->|Yes| M[Save to favorites]
    
    M --> N[Request property tour]
    N --> O[Schedule tour appointment]
    O --> P[Attend property tour]
    P --> Q{Satisfied with property?}
    
    Q -->|No| R[Continue searching]
    R --> H
    Q -->|Yes| S[Contact agent for offer]
    
    S --> T[Negotiate terms]
    T --> U[Submit formal offer]
    U --> V[Wait for seller response]
    V --> W{Offer accepted?}
    
    W -->|No| X{Submit counter offer?}
    X -->|Yes| T
    X -->|No| R
    W -->|Yes| Y[Begin transaction process]
    
    Y --> Z[Complete paperwork]
    Z --> AA[Arrange financing]
    AA --> BB[Property inspection]
    BB --> CC[Finalize purchase]
    CC --> DD[End]
```

### 3.3 Agent Property Management Activity

```mermaid
flowchart TD
    A[Agent logs in] --> B[View dashboard]
    B --> C[Check pending tasks]
    C --> D{New tour requests?}
    
    D -->|Yes| E[Review tour requests]
    E --> F[Coordinate with sellers]
    F --> G[Confirm tour schedules]
    G --> H[Send confirmations]
    
    D -->|No| I{New property inquiries?}
    I -->|Yes| J[Review inquiries]
    J --> K[Research property details]
    K --> L[Contact potential buyers]
    L --> M[Provide information]
    
    I -->|No| N{Property listings to update?}
    N -->|Yes| O[Review listing performance]
    O --> P[Update property information]
    P --> Q[Adjust pricing if needed]
    Q --> R[Upload new images/videos]
    
    N -->|No| S{Client communications?}
    S -->|Yes| T[Respond to messages]
    T --> U[Schedule follow-up calls]
    U --> V[Update client records]
    
    S -->|No| W[Generate activity reports]
    W --> X[Plan next day activities]
    X --> Y[End]
    
    H --> I
    M --> N
    R --> S
    V --> W
```

### 3.4 Admin System Management Activity

```mermaid
flowchart TD
    A[Admin logs in] --> B[View system dashboard]
    B --> C[Check pending approvals]
    C --> D{New listings to approve?}
    
    D -->|Yes| E[Review listing details]
    E --> F{Listing meets criteria?}
    F -->|No| G[Reject listing]
    G --> H[Send rejection notice]
    F -->|Yes| I[Approve listing]
    I --> J[Publish to platform]
    
    D -->|No| K{User issues to resolve?}
    K -->|Yes| L[Review user complaints]
    L --> M[Investigate issues]
    M --> N[Take appropriate action]
    N --> O[Update user records]
    
    K -->|No| P{System maintenance needed?}
    P -->|Yes| Q[Schedule maintenance]
    Q --> R[Notify users of downtime]
    R --> S[Perform system updates]
    S --> T[Test system functionality]
    
    P -->|No| U[Generate system reports]
    U --> V[Analyze platform metrics]
    V --> W[Plan improvements]
    W --> X[Update system configuration]
    X --> Y[End]
    
    H --> K
    J --> K
    O --> P
    T --> U
```

## 4. Use Case Relationships Diagram

```mermaid
classDiagram
    class Authentication {
        <<use case>>
        +UC-001: User Registration
        +UC-002: User Login  
        +UC-003: Social Login
    }
    
    class BuyerUseCases {
        <<use case>>
        +UC-101: Search Properties
        +UC-102: View Property Details
        +UC-103: Request Property Tour
        +UC-104: Chat with Agent
        +UC-105: Save Favorites
        +UC-106: Manage Profile
    }
    
    class SellerUseCases {
        <<use case>>
        +UC-201: Create Property Listing
        +UC-202: Upload Property Images
        +UC-203: Manage Property Listings
        +UC-204: Handle Tour Requests
        +UC-205: Chat with Agents
        +UC-206: Manage Property Offers
        +UC-207: View Property Analytics
    }
    
    class AgentUseCases {
        <<use case>>
        +UC-301: Coordinate Buyers and Sellers
        +UC-302: Facilitate Communications
        +UC-303: Assist Property Tours
        +UC-304: Support Transactions
        +UC-305: Manage Client Relationships
        +UC-306: Provide Market Guidance
    }
    
    class AdminUseCases {
        <<use case>>
        +UC-401: Approve Property Listings
        +UC-402: Manage User Accounts
        +UC-403: Monitor Platform Activity
        +UC-404: Handle Disputes
        +UC-405: System Configuration
        +UC-406: Generate Reports
    }
    
    class SystemUseCases {
        <<use case>>
        +UC-501: User Profiling
        +UC-502: Email Notifications
        +UC-503: Real-time Chat
    }

    Buyer --> BuyerUseCases : performs
    Seller --> SellerUseCases : performs
    Agent --> AgentUseCases : performs
    Admin --> AdminUseCases : performs
    
    BuyerUseCases --> Authentication : extends
    SellerUseCases --> Authentication : extends
    AgentUseCases --> Authentication : extends
    AdminUseCases --> Authentication : extends
    
    BuyerUseCases --> SystemUseCases : includes
    SellerUseCases --> SystemUseCases : includes
    AgentUseCases --> SystemUseCases : includes
```
