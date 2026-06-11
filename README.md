# Logistics By Storm - Project Overview

## Project Overview

**Project Name:** Logistics By Storm
**Repository Name:** wowdash-react-typescript-shadcn
**Type:** Frontend SaaS-style dashboard application built with React + TypeScript
**Purpose:** A multi-module logistics and business operations dashboard with analytics, team management, reporting, and authentication.
**Deployment:** Vercel-ready configuration via `vercel.json`
**Current Progress:** Core app shell, routing, authentication scaffolding, dashboard navigation, charting, forms, layouts, and reusable UI components are implemented.

## Updated Folder Structure

```
logistics-by-storm/
├── .env
├── .env.development
├── .env.production
├── .gitignore
├── README.md
├── RBAC_DOCUMENTATION.md
├── bash.exe.stackdump
├── components.json
├── dist/
├── eslint.config.js
├── index.html
├── node_modules/
├── package-lock.json
├── package.json
├── project-overview.txt
├── public/
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
├── vite.config.ts
└── src/
    ├── App.tsx
    ├── firebase.ts
    ├── index.css
    ├── main.tsx
    ├── assets/
    │   ├── images/
    │   │   ├── arrow-down.png
    │   │   ├── envelope.svg
    │   │   ├── error-img.png
    │   │   ├── faq-img.png
    │   │   ├── favicon.png
    │   │   ├── flags/
    │   │   ├── home-eight/
    │   │   ├── home-eleven/
    │   │   ├── home-fourteen/
    │   │   ├── home-nine/
    │   │   ├── home-six/
    │   │   ├── home-sixteen/
    │   │   ├── home-twelve/
    │   │   ├── homeThirteen/
    │   │   ├── icons/
    │   │   ├── kanban/
    │   │   ├── lists/
    │   │   ├── logo-icon.png
    │   │   ├── logo-light.png
    │   │   ├── logo.png
    │   │   ├── nft/
    │   │   ├── notice/
    │   │   ├── notification/
    │   │   ├── payment/
    │   │   ├── pricing/
    │   │   ├── product/
    │   │   ├── tabs/
    │   │   ├── user-grid/
    │   │   ├── user-list/
    │   │   ├── users/
    │   │   ├── videos/
    │   │   ├── world-map/
    │   │   ├── auth/
    │   │   ├── avatar/
    │   │   ├── blog/
    │   │   ├── card/
    │   │   ├── carousel/
    │   │   ├── chat/
    │   │   ├── chatgpt/
    │   │   ├── coming-soon/
    │   │   ├── crypto/
    │   │   ├── currency/
    │   │   ├── error/
    │   │   ├── gallery/
    │   │   ├── gif/
    │   │   └── users/
    │   └── world-map/
    │       └── world-map.png
    ├── components/
    │   ├── AppSidebar.tsx
    │   ├── LazyWrapper.tsx
    │   ├── ModeToggle.tsx
    │   ├── NavMain.tsx
    │   ├── theme-provider.tsx
    │   ├── charts/
    │   │   ├── AreaChartBigChart.tsx
    │   │   ├── AreaChartWave.tsx
    │   │   ├── AreaSharpChart.tsx
    │   │   ├── AreaWithoutLineChart.tsx
    │   │   ├── BarChartYear.tsx
    │   │   ├── BarLightChart.tsx
    │   │   ├── CandlestickChart.tsx
    │   │   ├── DonutFiveSeriesChart.tsx
    │   │   ├── DonutFourSeriesChart.tsx
    │   │   ├── DonutHalfChart.tsx
    │   │   ├── DonutSixSeriesChart.tsx
    │   │   ├── DonutThreeSeriesChart.tsx
    │   │   ├── DonutTwoSeriesChart.tsx
    │   │   ├── DoubleBarChartSevenSeries.tsx
    │   │   ├── DoubleBarChart.tsx
    │   │   ├── DoubleLineChart.tsx
    │   │   ├── FourColorBarChart.tsx
    │   │   ├── GradientChart.tsx
    │   │   ├── LineChartAnimation.tsx
    │   │   ├── LineChartLabel.tsx
    │   │   ├── LineChartOneSeries.tsx
    │   │   ├── LineChart.tsx
    │   │   ├── MultipleSeriesChart.tsx
    │   │   ├── PieChart.tsx
    │   │   ├── RadarChart.tsx
    │   │   ├── RadialBarChart.tsx
    │   │   ├── RadialHalfChart.tsx
    │   │   ├── RevenueStatisticAreaChart.tsx
    │   │   ├── SalesStaticChart.tsx
    │   │   ├── ShipmentLineChart.tsx
    │   │   ├── SingleBarChart.tsx
    │   │   ├── SmallAreaChart.tsx
    │   │   ├── SmallAreaChartTwo.tsx
    │   │   ├── SteplineChart.tsx
    │   │   ├── ThreeBarChart.tsx
    │   │   ├── TripleBarChart.tsx
    │   │   ├── UpdownBarChart.tsx
    │   │   └── ZoomableChart.tsx
    │   ├── data-table/
    │   │   ├── columns/
    │   │   │   └── users-columns.tsx
    │   │   ├── data-table-pagination.tsx
    │   │   ├── data-table-toolbar.tsx
    │   │   └── data-table.tsx
    │   ├── rbac/
    │   │   ├── CanAccess.tsx
    │   │   ├── DeleteRoleDialog.tsx
    │   │   ├── PermissionTable.tsx
    │   │   ├── RoleList.tsx
    │   │   ├── RoleModal.tsx
    │   │   └── ToggleSwitch.tsx
    │   ├── shared/
    │   │   ├── BuyBalanceContent.tsx
    │   │   ├── CommonLink.tsx
    │   │   ├── CountryList.tsx
    │   │   ├── CustomSelect.tsx
    │   │   ├── DatePicker.tsx
    │   │   ├── DefaultCardComponent.tsx
    │   │   ├── LanguageSelect.tsx
    │   │   ├── MasterCardSlider.tsx
    │   │   ├── MessageDropdown.tsx
    │   │   ├── NoticeBoardList.tsx
    │   │   ├── NotificationDropdown.tsx
    │   │   ├── ProfileDropdown.tsx
    │   │   ├── SearchBox.tsx
    │   │   ├── SellBalanceContent.tsx
    │   │   ├── ThemeLogo.tsx
    │   │   ├── TopCustomerList.tsx
    │   │   ├── TransactionList.tsx
    │   │   └── WorldMap.tsx
    │   ├── shipment/
    │   │   ├── ShipmentCalculationModal.tsx
    │   │   └── ShipmentStandbyModal.tsx
    │   ├── slider/
    │   │   ├── ExclusiveTravelPackagesSlider.tsx
    │   │   └── OfficeSlider.tsx
    │   ├── tables/
    │   │   ├── BorderedColorTable.tsx
    │   │   ├── BorderedTable.tsx
    │   │   ├── CoursesTable.tsx
    │   │   ├── DefaultTable.tsx
    │   │   ├── InventoryRecentTransactionsTable.tsx
    │   │   ├── LastTransactionTable.tsx
    │   │   ├── LatestAppointmentsTable.tsx
    │   │   ├── LatestInvestmentsTable.tsx
    │   │   ├── LatestRegisteredTable.tsx
    │   │   ├── LatestSubscribeTable.tsx
    │   │   ├── MyOrderTable.tsx
    │   │   ├── PaymentHistoryTable.tsx
    │   │   ├── PerformanceAgentsTable.tsx
    │   │   ├── ProjectStatusTable.tsx
    │   │   ├── RecentActivityTable.tsx
    │   │   ├── RecentBidTable.tsx
    │   │   ├── RecentLeadsTable.tsx
    │   │   ├── RecentOrdersTable.tsx
    │   │   ├── RecentPurposePlanTable.tsx
    │   │   ├── RecentTransactionTable.tsx
    │   │   ├── StockReportTable.tsx
    │   │   ├── TodoListRecentTable.tsx
    │   │   ├── ToDoListTable.tsx
    │   │   ├── TopSellingProductTable.tsx
    │   │   ├── TransactionHistoryTable.tsx
    │   │   ├── UsersListTable.tsx
    │   │   ├── payments/
    │   │   │   └── column.tsx
    │   │   ├── shipments/
    │   │   │   └── columns.tsx
    │   │   ├── shipments-request/
    │   │   │   ├── columns.tsx
    │   │   │   └── tracking-columns.tsx
    │   │   ├── teams/
    │   │   │   └── columns.tsx
    │   │   └── users/
    │   │       ├── column.tsx
    │   │       └── data-tables.tsx
    │   ├── teams/
    │   │   ├── AddMemberForm.tsx
    │   │   ├── AddMemberModal.tsx
    │   │   └── TeamsTable.tsx
    │   ├── ui/
    │   │   ├── alert-dialog.tsx
    │   │   ├── badge.tsx
    │   │   ├── breadcrumb.tsx
    │   │   ├── button.tsx
    │   │   ├── calendar.tsx
    │   │   ├── card.tsx
    │   │   ├── carousel.tsx
    │   │   ├── checkbox.tsx
    │   │   ├── collapsible.tsx
    │   │   ├── command.tsx
    │   │   ├── dialog.tsx
    │   │   ├── dropdown-menu.tsx
    │   │   ├── field.tsx
    │   │   ├── form.tsx
    │   │   ├── input-group.tsx
    │   │   ├── input.tsx
    │   │   ├── label.tsx
    │   │   ├── popover.tsx
    │   │   ├── radio-group.tsx
    │   │   ├── scroll-area.tsx
    │   │   ├── select.tsx
    │   │   ├── separator.tsx
    │   │   ├── sheet.tsx
    │   │   ├── sidebar.tsx
    │   │   ├── skeleton.tsx
    │   │   ├── sonner.tsx
    │   │   ├── switch.tsx
    │   │   ├── table.tsx
    │   │   ├── tabs.tsx
    │   │   ├── textarea.tsx
    │   │   └── tooltip.tsx
    │   └── users/
    │       ├── AddUserModal.tsx
    │       └── UserForm.tsx
    ├── config/
    │   └── env.ts
    ├── context/
    │   ├── EmailSidebarContext.tsx
    │   ├── isSubmittingContext.tsx
    │   └── LoadingContext.tsx
    ├── data/
    │   ├── SidebarData.ts
    │   └── users.ts
    ├── error/
    │   ├── 404.tsx
    │   ├── ComponentErrorBoundary.tsx
    │   └── RouteErrorBoundary.tsx
    ├── hooks/
    │   ├── useLocalStorage.ts
    │   ├── use-mobile.ts
    │   ├── usePermissions.ts
    │   ├── use-shipment-details.ts
    │   └── useUsers.ts
    ├── layouts/
    │   ├── Breadcrumb.tsx
    │   ├── Footer.tsx
    │   ├── Header.tsx
    │   ├── MainLayout.tsx
    │   └── SidebarLayout.tsx
    ├── lib/
    │   ├── axios.ts
    │   ├── formValidation.ts
    │   ├── permissions.ts
    │   ├── utils.ts
    │   └── zod.ts
    ├── loading/
    │   ├── LoadingSkeleton.tsx
    │   └── PageLoader.tsx
    ├── pages/
    │   ├── TeamsPermissions.tsx
    │   ├── auth/
    │   │   ├── components/
    │   │   │   └── SocialLogin.tsx
    │   │   ├── forgot-password/
    │   │   │   └── ForgotPassword.tsx
    │   │   ├── login/
    │   │   │   └── Login.tsx
    │   │   ├── member-create-password/
    │   │   │   └── CreatePassword.tsx
    │   │   └── register/
    │   │       └── Register.tsx
    │   ├── basic-table/
    │   │   └── BasicTable.tsx
    │   ├── calendar/
    │   │   ├── Calendar.tsx
    │   │   └── components/
    │   │       ├── AddEvent.tsx
    │   │       ├── BasicFullCalendar.tsx
    │   │       ├── CalendarSidebar.tsx
    │   │       ├── EditEvent.tsx
    │   │       └── ViewEvent.tsx
    │   ├── chart/
    │   │   ├── circle-chart/
    │   │   │   └── SemiCircleGauge.tsx
    │   │   ├── column-chart/
    │   │   │   └── ColumnChartPage.tsx
    │   │   ├── line-chart/
    │   │   │   ├── HorizontalBarChart.tsx
    │   │   │   ├── LineChartPage.tsx
    │   │   │   └── SingleLineChart.tsx
    │   │   ├── pie-chart/
    │   │   │   └── PieChartPage.tsx
    │   │   ├── PieChartPage.tsx
    │   │   └── PieFourChart.tsx
    │   ├── chat/
    │   │   ├── Chat.tsx
    │   │   └── components/
    │   │       └── ChatBox.tsx
    │   ├── components-pages/
    │   │   ├── alert/Alert.tsx
    │   │   ├── avatar/Avatart.tsx
    │   │   ├── badges/Badges.tsx
    │   │   ├── buttons/Buttons.tsx
    │   │   ├── card/CardPage.tsx
    │   │   ├── colors/Colors.tsx
    │   │   ├── dropdown/Dropdown.tsx
    │   │   ├── list/List.tsx
    │   │   ├── pagination/Pagination.tsx
    │   │   ├── progress-bar/ProgressBar.tsx
    │   │   ├── radio/Radio.tsx
    │   │   ├── star-ratings/StarRatings.tsx
    │   │   ├── switch/SwitchPage.tsx
    │   │   ├── tab-accordion/TabAccordion.tsx
    │   │   ├── tags/Tags.tsx
    │   │   ├── tooltip-popover/TooltipPopover.tsx
    │   │   └── typography/Typography.tsx
    │   ├── customer/
    │   │   ├── CustomerDetailsSkeleton.tsx
    │   │   ├── CustomerDetails.tsx
    │   │   ├── customer-grid/
    │   │   │   ├── CustomersGrid.tsx
    │   │   │   └── UsersGridCard.tsx
    │   │   ├── CustomersList.tsx
    │   │   └── view-profile/
    │   │       └── ViewProfile.tsx
    │   ├── dashboards/
    │   │   ├── analytics/Analytics.tsx
    │   │   ├── booking/Booking.tsx
    │   │   ├── crm/Crm.tsx
    │   │   ├── cryptocurrency/Cryptocurrency.tsx
    │   │   ├── dashboard/AiDashboard.tsx
    │   │   ├── ecommerce/Ecommerce.tsx
    │   │   ├── finance/Finance.tsx
    │   │   ├── help/Help.tsx
    │   │   ├── inventory/Inventory.tsx
    │   │   ├── investment/Investment.tsx
    │   │   ├── lms/Lms.tsx
    │   │   ├── medical/Medical.tsx
    │   │   ├── nft/Nft.tsx
    │   │   └── podcast/Podcast.tsx
    │   ├── emails/
    │   │   ├── email/Email.tsx
    │   │   ├── email-details/EmailDetails.tsx
    │   │   └── components/
    │   │       ├── EmailHeader.tsx
    │   │       ├── EmailList.tsx
    │   │       ├── EmailSidebar.tsx
    │   │       ├── EmailSidebarOverlay.tsx
    │   │       └── EmailSidebarToggleButton.tsx
    │   ├── forms/
    │   │   ├── form-validation/
    │   │   │   ├── actions.ts
    │   │   │   ├── FormValidation.tsx
    │   │   │   └── ValidateForm.tsx
    │   │   ├── input-forms/InputForms.tsx
    │   │   └── input-layout/InputLayout.tsx
    │   ├── packages/
    │   │   ├── search-package/SearchPackage.tsx
    │   │   └── unregistered-package/UnregisteredPackage.tsx
    │   ├── payments/
    │   │   ├── payments-details/PaymentsDetails.tsx
    │   │   └── payments-list/PaymentList.tsx
    │   ├── roles/RolesList.tsx
    │   ├── setting/
    │   │   ├── company/Company.tsx
    │   │   ├── notification-alert/NotificationAlert.tsx
    │   │   └── settings-notification/
    │   │       ├── ClientFirebaseWrapper.tsx
    │   │       └── SettingsNotification.tsx
    │   ├── shipments-request/
    │   │   ├── shipmentlistexample.tsx
    │   │   ├── ShipmentListTable.tsx
    │   │   ├── ShipmentListView.tsx
    │   │   └── ShipmentRequestList.tsx
    │   ├── shipments/
    │   │   ├── ShipmentDetail.tsx
    │   │   ├── ShipmentList.tsx
    │   │   └── Shipments.tsx
    │   ├── teams/
    │   │   ├── add-member/
    │   │   │   ├── AddMember(useles).tsx
    │   │   │   └── Formsffsdf.css
    │   │   ├── TeamMemberView.tsx
    │   │   ├── Teams.tsx
    │   │   └── TeamsPermissions.tsx
    │   └── widgets/Widgets.tsx
    ├── routes/
    │   ├── AppRoutes.tsx
    │   ├── GuestRoutes.tsx
    │   └── ProtectedRoutes.tsx
    ├── schema/
    │   └── shipment.schema.ts
    ├── services/
    │   ├── api.ts
    │   ├── auth.service.ts
    │   ├── permission.service.ts
    │   ├── rbac.service.ts
    │   ├── role.service.ts
    │   ├── search-package.service.ts
    │   ├── shipment.service.ts
    │   └── shipment-track.service.ts
    ├── store/
    │   ├── authStore.ts
    │   ├── customerDetailsStore.ts
    │   ├── customerStore.ts
    │   ├── dashboardStore.ts
    │   ├── paymentDetailsStore.ts
    │   ├── paymentsList.ts
    │   ├── profileStore.ts
    │   ├── rbacStore.ts
    │   ├── revenueChartStore.ts
    │   ├── shipmentChartStore.ts
    │   ├── shipmentDetailsStore.ts
    │   ├── shipmentStore.ts
    │   ├── shipmentTrackStore.ts
    │   ├── teamStore.ts
    │   └── updateProfileStore.ts
    └── types/
        ├── permission.types.ts
        ├── rbac.ts
        ├── search-package.ts
        ├── shipments-track.ts
        └── shipment.ts
```

## Technology Stack

### Core Frameworks
- React 19
- TypeScript 5.9
- Vite 7

### Styling and UI
- Tailwind CSS 4
- shadcn/ui-based primitives
- Radix UI packages for accessible components
- lucide-react icons
- cmdk command palette
- tailwind-merge, class-variance-authority, clsx

### Charts and Interaction
- ApexCharts + react-apexcharts
- FullCalendar React with daygrid/timegrid/interaction
- keen-slider and embla-carousel-react
- react-day-picker

### State, Forms, and Validation
- react-hook-form
- Zod schemas
- @hookform/resolvers
- date-fns
- uuid

### Backend and Auth
- Firebase SDK
- react-firebase-hooks
- email/password auth scaffold plus OAuth-ready patterns
- Firestore-based profile/data potential

### Routing and UX
- react-router-dom v7
- Protected and guest route handling
- toast notifications via react-toastify and sonner
- tooltips via react-tooltip
- theme toggling via next-themes

### Development Tools
- ESLint and TypeScript linting
- tsconfig app/node/workspace separation
- Vercel deployment config

## Key Features
- Multi-dashboard experience with CRM, eCommerce, finance, analytics, inventory, medical, NFT, investment, booking, help, and podcast pages.
- Universal admin and logistics screens including customer list/grid, team management, shipments, shipment request detail, payments, and package search.
- Comprehensive component library pages for UI elements such as alerts, buttons, cards, badges, tooltips, tabs, forms, and charts.
- Auth pages for login, registration, forgot password, and member password creation.
- Full calendar with interaction, chat, email inbox, and notification settings.

## Authentication & Authorization
- Firebase-based authentication using email/password and social login providers (Google, GitHub).
- Firestore user profiles saved under `users` collection with username, email, and creation timestamp.
- `GuestRoutes` and `ProtectedRoutes` wrappers redirect based on `access_token` in `localStorage`.
- Auth utilities implemented in `src/firebase.ts` including register, login, social sign-in, password reset, and profile retrieval.

## Routing and Pages
- Root app router configured in `src/routes/AppRoutes.tsx` with `MainLayout` for protected pages.
- Guest routes include `/auth/login`, `/auth/register`, `/auth/forgot-password`, and `/auth/create-password`.
- Protected pages include `/dashboard`, `/email`, `/chat`, `/calendar`, `/customers-list`, `/customers-grid`, `/teams-list`, `/shipment-request`, `/shipments`, `/payment-lists`, `/search-package`, `/unregistered-package`, and settings pages.
- Error handling via `RouteErrorBoundary` and a custom `404` page.
- Lazy-loaded dashboard and team pages for performance.

## Data, Services, and State Management
- `src/services` contains auth, permission, role, and RBAC-related service abstractions.
- `src/store` uses Zustand for global state stores such as auth, customer, shipment, profile, dashboard, payments, and team state.
- `src/schema` defines shared validation schemas with Zod for shipments and other application forms.
- `src/hooks` provide reusable logic for mobile detection, localStorage, users, permissions, and shipment details.
- `src/context` exposes loading, email sidebar, and form submission state across the app.

## Deployment and Environment
- Vite app configured with `vite.config.ts` and environment config handled by `src/config/env.ts`.
- Vercel-ready via `vercel.json` and standard `npm` scripts: `dev`, `build`, `lint`, and `preview`.
- Environment files expected: `.env`, `.env.development`, `.env.production`.

## Backend & External APIs Used
- Base API URL configured by `VITE_API_BASE_URL` through `src/config/env.ts` and `src/lib/axios.ts`.
- Authentication login endpoint: `/auth/login` via `src/services/api.ts`.
- Profile endpoints: `/profile` GET and `/profile` POST (PUT override) via `src/store/profileStore.ts` and `src/store/updateProfileStore.ts`.
- Customer endpoints: `/admin/customers` via `src/store/customerStore.ts`.
- Payments endpoints: `/admin/payments` and `/admin/payments/:id` via `src/store/paymentsList.ts` and `src/store/paymentDetailsStore.ts`.
- Shipment request endpoints: `/admin/shipment-requests`, `/admin/shipment-requests/:id`, `/admin/shipment-requests/:id/calculate-charge`, `/admin/shipment-requests/:id/booking-status`, and `/admin/warehouse/shipment-requests/:id/receive`.
- Search endpoint for package/shipment requests: `/admin/warehouse/search-requests` via `src/services/search-package.service.ts`.
- Shipments endpoints: `/admin/shipments`, `/admin/shipments/:id`, and `/admin/shipments/:id/tracking/status` via `src/services/shipment-track.service.ts` and `src/store/shipmentDetailsStore.ts`.
- Dashboard endpoints: `/admin/dashboard`, `/admin/dashboard/charts/revenue`, and `/admin/dashboard/charts/shipments` via `src/store/dashboardStore.ts`, `src/store/revenueChartStore.ts`, and `src/store/shipmentChartStore.ts`.
- Team management endpoints: `/admin/teams` and `/admin/teams/:id` via `src/store/teamStore.ts`.
- RBAC endpoints: `/admin/roles`, `/admin/roles/:id`, and `/admin/permissions` via `src/services/rbac.service.ts`, `src/services/role.service.ts`, and `src/services/permission.service.ts`.
- External authentication and database: Firebase Auth and Firestore via `src/firebase.ts`.
- External avatar image API used for placeholder avatars: `https://ui-avatars.com/api/` in `src/hooks/useUsers.ts`.

## Notes and Project Maturity
- The repository is a production-style frontend dashboard scaffold with real Firebase auth and analytics integration.
- It includes extensive UI and page coverage, but several routes and components may still be under active development or commented out for future enhancements.
- The project is suitable for logistics operations, team collaboration, package management, and enterprise dashboard use cases.

## API Authentication and Admin Account Management

### Overview
The application integrates with an Admin API that provides user authentication and authorization through role-based access control (RBAC). Upon successful login, the API returns comprehensive admin user data including permissions and bearer token authentication.

### Admin API Response Structure

The login/authentication endpoint returns the following response:

```json
{
  "data": {
    "user": {
      "id": "019e023a-f7be-71c0-92e0-f20a0651737a",
      "name": "Sumit pal",
      "email": "priyanshu.tripathi@networsys.com",
      "phone": "7705978888",
      "role": ["admin"],
      "permissions": [
        "countries.create",
        "countries.delete",
        "countries.update",
        "countries.view",
        // ... additional permissions
      ]
    },
    "access_token": "49|UiD5Rvc1vRc5Zevhldz8cvseEH0rWZTmAMX8ktDa7c298b4d",
    "token_type": "Bearer"
  }
}
```

### User Data Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string (UUID) | Unique identifier for the admin user |
| `name` | string | Full name of the admin user |
| `email` | string | Email address for communications and login |
| `phone` | string | Contact phone number |
| `role` | array[string] | User roles (e.g., "admin"). Controls overall access level |
| `permissions` | array[string] | Fine-grained permission strings for feature access |

### Authentication Token

- **access_token**: Bearer token used for all subsequent API requests. Include this in the Authorization header: `Authorization: Bearer <access_token>`
- **token_type**: Always "Bearer" for this API
- Store securely in localStorage or state management (e.g., `src/store/authStore.ts`)

### Permission Structure

Permissions follow a pattern: `<resource>.<action>`

#### Resources Managed by Admin:
- **countries**: Geographic regions
- **coupons**: Discount/promotional codes
- **customs_declarations**: Import/export documentation
- **dashboard**: Analytics and overview view
- **facilities**: Warehouses and distribution centers
- **invoices**: Billing documents
- **locations**: Delivery and pickup locations
- **payments**: Transaction management
- **permissions**: System permission management
- **rate_cards**: Shipping rate definitions
- **reports**: Business analytics and reports
- **roles**: User role definitions and management
- **service_types**: Shipping service categories (Express, Standard, etc.)
- **shipment_charges**: Calculated shipping fees
- **shipment_packages**: Package/parcel definitions
- **shipment_requests**: Customer shipment orders
- **shipments**: Actual shipment tracking
- **tracking_logs**: Shipment event history
- **users**: User account management

#### Actions:
- **view**: Read-only access to resource
- **create**: Add new resource instances
- **update**: Modify existing resources
- **delete**: Remove resources
- **calculate_charge**: Compute shipping rates
- **cancel**: Void/cancel shipments or requests
- **review**: Approve/review pending items
- **issue**: Generate invoices
- **void**: Cancel invoices
- **initiate**: Start payment processes
- **refund**: Process refunds
- **verify**: Validate payments
- **update_status**: Change shipment status

### Integration Points

1. **Auth Service** (`src/services/auth.service.ts`):
   - Handle login API call
   - Extract user data and token
   - Store token for API authentication

2. **Auth Store** (`src/store/authStore.ts`):
   - Store admin user profile (name, email, phone)
   - Maintain role and permissions in state
   - Provide context to components

3. **Permission Service** (`src/services/permission.service.ts`):
   - Validate user permissions against required actions
   - Gate UI elements and features
   - Used with RBAC system in `src/components/rbac/`

4. **Protected Routes** (`src/routes/ProtectedRoutes.tsx`):
   - Verify token before allowing route access
   - Redirect to login if token is invalid or expired

5. **API Requests** (`src/services/api.ts`):
   - Automatically include bearer token in Authorization header
   - Handle token expiration and refresh logic

### Admin Account Management Best Practices

1. **Token Storage**: Store access_token securely; consider httpOnly cookies or secure localStorage
2. **Token Expiration**: Implement token refresh logic in API service
3. **Permission Caching**: Cache permissions in state to avoid repeated API calls
4. **Feature Gating**: Use `checkPermission()` utility before rendering admin-only features
5. **Logging Out**: Clear token, user data, and permissions from storage on logout
6. **Error Handling**: Handle 401 Unauthorized responses by redirecting to login

## Current Project Progress

### Completed
- Fully wired application shell with responsive layout and routing.
- Sidebar navigation, header, breadcrumb, and footer consistently applied.
- Authentication scaffolding through `src/firebase.ts` and `src/services/auth.service.ts`.
- Protected route management in `src/routes/ProtectedRoutes.tsx`.
- Multi-page dashboard architecture formed under `src/pages/dashboards/`.
- Shared UI and component catalog in `src/components/ui/` and `src/pages/components-pages/`.
- Centralized context providers for loading, submission state, and sidebar behavior.
- Form validation structure in `src/lib/formValidation.ts` and `src/lib/zod.ts`.
- Base charting components and dashboard analytics setup completed.
- Error fallback pages and boundaries implemented.
- Admin API authentication structure documented and ready for integration.

### Remaining / Next Steps
- Integrate Admin API authentication endpoint with current auth service
- Update `authStore.ts` to persist admin user data and permissions from API response
- Implement permission checking in feature gates using `permission.service.ts`
- Complete logistics-specific data wiring for inventory, shipment, order, and performance dashboards.
- Expand RBAC functionality beyond the current permissions page into actual feature gating.
- Add backend API integration for live logistics metrics and transactional data.
- Improve mobile responsiveness and accessibility across the entire app.
- Add additional user management and team collaboration workflows.
- Finalize production-ready deployment variables and environment secret handling.

## Key Project Aspects

### Architecture
- `src/App.tsx` is the app root housing global providers and route mounting.
- `src/main.tsx` initializes Vite and renders the React application.
- `src/routes/` contains routing guards and route organization.
- `src/layouts/` separates layout concerns from page content.
- `src/components/` stores reusable UI building blocks grouped by purpose.
- `src/pages/` holds feature-specific page modules and dashboards.
- `src/services/` centralizes auth-related helper functions.
- `src/config/env.ts` supports environment-driven configuration.
- `src/types/rbac.ts` defines permission models.

### Project Focus
- Dashboard-first experience with analytics, forms, tables, and charts.
- Reusable shadcn/Tailwind-based UI components.
- Firebase authentication and secure route handling.
- Clean modular folder structure for fast iteration.
- Vercel-ready deployment with a modern frontend toolchain.

## Summary
This overview now reflects the actual workspace structure and current progress of Logistics By Storm. The application has a stable frontend foundation, and the next phase is to enrich dashboard data, complete RBAC gating, and connect the UI to real logistics backend flows.
