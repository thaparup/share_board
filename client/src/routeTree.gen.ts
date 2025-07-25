/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignupImport } from './routes/signup'
import { Route as ProductImport } from './routes/product'
import { Route as LoginImport } from './routes/login'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as WorkspacesIndexImport } from './routes/workspaces.index'
import { Route as WorkspacesWorkspaceIdImport } from './routes/workspaces.$workspaceId'
import { Route as TasksManageImport } from './routes/tasks.manage'
import { Route as ManageTaskImport } from './routes/manage.task'
import { Route as AssignedTasksIndexImport } from './routes/assigned.tasks.index'
import { Route as ManageTaskTaskIdImport } from './routes/manage.task.$taskId'
import { Route as WorkspacesWorkspaceIdTaskCreateImport } from './routes/workspaces_.$workspaceId.task.create'
import { Route as WorkspacesWorkspaceIdTaskViewTaskIdImport } from './routes/workspaces_.$workspaceId.task.view.$taskId'
import { Route as WorkspacesWorkspaceIdTaskManageTaskIdImport } from './routes/workspaces_.$workspaceId.task.manage.$taskId'
import { Route as AssignedWorkspaceWorkspaceIdTaskTaskIdImport } from './routes/assigned.workspace_.$workspaceId.task.$taskId'

// Create/Update Routes

const SignupRoute = SignupImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const ProductRoute = ProductImport.update({
  id: '/product',
  path: '/product',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const DashboardRoute = DashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const WorkspacesIndexRoute = WorkspacesIndexImport.update({
  id: '/workspaces/',
  path: '/workspaces/',
  getParentRoute: () => rootRoute,
} as any)

const WorkspacesWorkspaceIdRoute = WorkspacesWorkspaceIdImport.update({
  id: '/workspaces/$workspaceId',
  path: '/workspaces/$workspaceId',
  getParentRoute: () => rootRoute,
} as any)

const TasksManageRoute = TasksManageImport.update({
  id: '/tasks/manage',
  path: '/tasks/manage',
  getParentRoute: () => rootRoute,
} as any)

const ManageTaskRoute = ManageTaskImport.update({
  id: '/manage/task',
  path: '/manage/task',
  getParentRoute: () => rootRoute,
} as any)

const AssignedTasksIndexRoute = AssignedTasksIndexImport.update({
  id: '/assigned/tasks/',
  path: '/assigned/tasks/',
  getParentRoute: () => rootRoute,
} as any)

const ManageTaskTaskIdRoute = ManageTaskTaskIdImport.update({
  id: '/$taskId',
  path: '/$taskId',
  getParentRoute: () => ManageTaskRoute,
} as any)

const WorkspacesWorkspaceIdTaskCreateRoute =
  WorkspacesWorkspaceIdTaskCreateImport.update({
    id: '/workspaces_/$workspaceId/task/create',
    path: '/workspaces/$workspaceId/task/create',
    getParentRoute: () => rootRoute,
  } as any)

const WorkspacesWorkspaceIdTaskViewTaskIdRoute =
  WorkspacesWorkspaceIdTaskViewTaskIdImport.update({
    id: '/workspaces_/$workspaceId/task/view/$taskId',
    path: '/workspaces/$workspaceId/task/view/$taskId',
    getParentRoute: () => rootRoute,
  } as any)

const WorkspacesWorkspaceIdTaskManageTaskIdRoute =
  WorkspacesWorkspaceIdTaskManageTaskIdImport.update({
    id: '/workspaces_/$workspaceId/task/manage/$taskId',
    path: '/workspaces/$workspaceId/task/manage/$taskId',
    getParentRoute: () => rootRoute,
  } as any)

const AssignedWorkspaceWorkspaceIdTaskTaskIdRoute =
  AssignedWorkspaceWorkspaceIdTaskTaskIdImport.update({
    id: '/assigned/workspace_/$workspaceId/task/$taskId',
    path: '/assigned/workspace/$workspaceId/task/$taskId',
    getParentRoute: () => rootRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/product': {
      id: '/product'
      path: '/product'
      fullPath: '/product'
      preLoaderRoute: typeof ProductImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupImport
      parentRoute: typeof rootRoute
    }
    '/manage/task': {
      id: '/manage/task'
      path: '/manage/task'
      fullPath: '/manage/task'
      preLoaderRoute: typeof ManageTaskImport
      parentRoute: typeof rootRoute
    }
    '/tasks/manage': {
      id: '/tasks/manage'
      path: '/tasks/manage'
      fullPath: '/tasks/manage'
      preLoaderRoute: typeof TasksManageImport
      parentRoute: typeof rootRoute
    }
    '/workspaces/$workspaceId': {
      id: '/workspaces/$workspaceId'
      path: '/workspaces/$workspaceId'
      fullPath: '/workspaces/$workspaceId'
      preLoaderRoute: typeof WorkspacesWorkspaceIdImport
      parentRoute: typeof rootRoute
    }
    '/workspaces/': {
      id: '/workspaces/'
      path: '/workspaces'
      fullPath: '/workspaces'
      preLoaderRoute: typeof WorkspacesIndexImport
      parentRoute: typeof rootRoute
    }
    '/manage/task/$taskId': {
      id: '/manage/task/$taskId'
      path: '/$taskId'
      fullPath: '/manage/task/$taskId'
      preLoaderRoute: typeof ManageTaskTaskIdImport
      parentRoute: typeof ManageTaskImport
    }
    '/assigned/tasks/': {
      id: '/assigned/tasks/'
      path: '/assigned/tasks'
      fullPath: '/assigned/tasks'
      preLoaderRoute: typeof AssignedTasksIndexImport
      parentRoute: typeof rootRoute
    }
    '/workspaces_/$workspaceId/task/create': {
      id: '/workspaces_/$workspaceId/task/create'
      path: '/workspaces/$workspaceId/task/create'
      fullPath: '/workspaces/$workspaceId/task/create'
      preLoaderRoute: typeof WorkspacesWorkspaceIdTaskCreateImport
      parentRoute: typeof rootRoute
    }
    '/assigned/workspace_/$workspaceId/task/$taskId': {
      id: '/assigned/workspace_/$workspaceId/task/$taskId'
      path: '/assigned/workspace/$workspaceId/task/$taskId'
      fullPath: '/assigned/workspace/$workspaceId/task/$taskId'
      preLoaderRoute: typeof AssignedWorkspaceWorkspaceIdTaskTaskIdImport
      parentRoute: typeof rootRoute
    }
    '/workspaces_/$workspaceId/task/manage/$taskId': {
      id: '/workspaces_/$workspaceId/task/manage/$taskId'
      path: '/workspaces/$workspaceId/task/manage/$taskId'
      fullPath: '/workspaces/$workspaceId/task/manage/$taskId'
      preLoaderRoute: typeof WorkspacesWorkspaceIdTaskManageTaskIdImport
      parentRoute: typeof rootRoute
    }
    '/workspaces_/$workspaceId/task/view/$taskId': {
      id: '/workspaces_/$workspaceId/task/view/$taskId'
      path: '/workspaces/$workspaceId/task/view/$taskId'
      fullPath: '/workspaces/$workspaceId/task/view/$taskId'
      preLoaderRoute: typeof WorkspacesWorkspaceIdTaskViewTaskIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

interface ManageTaskRouteChildren {
  ManageTaskTaskIdRoute: typeof ManageTaskTaskIdRoute
}

const ManageTaskRouteChildren: ManageTaskRouteChildren = {
  ManageTaskTaskIdRoute: ManageTaskTaskIdRoute,
}

const ManageTaskRouteWithChildren = ManageTaskRoute._addFileChildren(
  ManageTaskRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/dashboard': typeof DashboardRoute
  '/login': typeof LoginRoute
  '/product': typeof ProductRoute
  '/signup': typeof SignupRoute
  '/manage/task': typeof ManageTaskRouteWithChildren
  '/tasks/manage': typeof TasksManageRoute
  '/workspaces/$workspaceId': typeof WorkspacesWorkspaceIdRoute
  '/workspaces': typeof WorkspacesIndexRoute
  '/manage/task/$taskId': typeof ManageTaskTaskIdRoute
  '/assigned/tasks': typeof AssignedTasksIndexRoute
  '/workspaces/$workspaceId/task/create': typeof WorkspacesWorkspaceIdTaskCreateRoute
  '/assigned/workspace/$workspaceId/task/$taskId': typeof AssignedWorkspaceWorkspaceIdTaskTaskIdRoute
  '/workspaces/$workspaceId/task/manage/$taskId': typeof WorkspacesWorkspaceIdTaskManageTaskIdRoute
  '/workspaces/$workspaceId/task/view/$taskId': typeof WorkspacesWorkspaceIdTaskViewTaskIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/dashboard': typeof DashboardRoute
  '/login': typeof LoginRoute
  '/product': typeof ProductRoute
  '/signup': typeof SignupRoute
  '/manage/task': typeof ManageTaskRouteWithChildren
  '/tasks/manage': typeof TasksManageRoute
  '/workspaces/$workspaceId': typeof WorkspacesWorkspaceIdRoute
  '/workspaces': typeof WorkspacesIndexRoute
  '/manage/task/$taskId': typeof ManageTaskTaskIdRoute
  '/assigned/tasks': typeof AssignedTasksIndexRoute
  '/workspaces/$workspaceId/task/create': typeof WorkspacesWorkspaceIdTaskCreateRoute
  '/assigned/workspace/$workspaceId/task/$taskId': typeof AssignedWorkspaceWorkspaceIdTaskTaskIdRoute
  '/workspaces/$workspaceId/task/manage/$taskId': typeof WorkspacesWorkspaceIdTaskManageTaskIdRoute
  '/workspaces/$workspaceId/task/view/$taskId': typeof WorkspacesWorkspaceIdTaskViewTaskIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/dashboard': typeof DashboardRoute
  '/login': typeof LoginRoute
  '/product': typeof ProductRoute
  '/signup': typeof SignupRoute
  '/manage/task': typeof ManageTaskRouteWithChildren
  '/tasks/manage': typeof TasksManageRoute
  '/workspaces/$workspaceId': typeof WorkspacesWorkspaceIdRoute
  '/workspaces/': typeof WorkspacesIndexRoute
  '/manage/task/$taskId': typeof ManageTaskTaskIdRoute
  '/assigned/tasks/': typeof AssignedTasksIndexRoute
  '/workspaces_/$workspaceId/task/create': typeof WorkspacesWorkspaceIdTaskCreateRoute
  '/assigned/workspace_/$workspaceId/task/$taskId': typeof AssignedWorkspaceWorkspaceIdTaskTaskIdRoute
  '/workspaces_/$workspaceId/task/manage/$taskId': typeof WorkspacesWorkspaceIdTaskManageTaskIdRoute
  '/workspaces_/$workspaceId/task/view/$taskId': typeof WorkspacesWorkspaceIdTaskViewTaskIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/dashboard'
    | '/login'
    | '/product'
    | '/signup'
    | '/manage/task'
    | '/tasks/manage'
    | '/workspaces/$workspaceId'
    | '/workspaces'
    | '/manage/task/$taskId'
    | '/assigned/tasks'
    | '/workspaces/$workspaceId/task/create'
    | '/assigned/workspace/$workspaceId/task/$taskId'
    | '/workspaces/$workspaceId/task/manage/$taskId'
    | '/workspaces/$workspaceId/task/view/$taskId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/dashboard'
    | '/login'
    | '/product'
    | '/signup'
    | '/manage/task'
    | '/tasks/manage'
    | '/workspaces/$workspaceId'
    | '/workspaces'
    | '/manage/task/$taskId'
    | '/assigned/tasks'
    | '/workspaces/$workspaceId/task/create'
    | '/assigned/workspace/$workspaceId/task/$taskId'
    | '/workspaces/$workspaceId/task/manage/$taskId'
    | '/workspaces/$workspaceId/task/view/$taskId'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/dashboard'
    | '/login'
    | '/product'
    | '/signup'
    | '/manage/task'
    | '/tasks/manage'
    | '/workspaces/$workspaceId'
    | '/workspaces/'
    | '/manage/task/$taskId'
    | '/assigned/tasks/'
    | '/workspaces_/$workspaceId/task/create'
    | '/assigned/workspace_/$workspaceId/task/$taskId'
    | '/workspaces_/$workspaceId/task/manage/$taskId'
    | '/workspaces_/$workspaceId/task/view/$taskId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  DashboardRoute: typeof DashboardRoute
  LoginRoute: typeof LoginRoute
  ProductRoute: typeof ProductRoute
  SignupRoute: typeof SignupRoute
  ManageTaskRoute: typeof ManageTaskRouteWithChildren
  TasksManageRoute: typeof TasksManageRoute
  WorkspacesWorkspaceIdRoute: typeof WorkspacesWorkspaceIdRoute
  WorkspacesIndexRoute: typeof WorkspacesIndexRoute
  AssignedTasksIndexRoute: typeof AssignedTasksIndexRoute
  WorkspacesWorkspaceIdTaskCreateRoute: typeof WorkspacesWorkspaceIdTaskCreateRoute
  AssignedWorkspaceWorkspaceIdTaskTaskIdRoute: typeof AssignedWorkspaceWorkspaceIdTaskTaskIdRoute
  WorkspacesWorkspaceIdTaskManageTaskIdRoute: typeof WorkspacesWorkspaceIdTaskManageTaskIdRoute
  WorkspacesWorkspaceIdTaskViewTaskIdRoute: typeof WorkspacesWorkspaceIdTaskViewTaskIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  DashboardRoute: DashboardRoute,
  LoginRoute: LoginRoute,
  ProductRoute: ProductRoute,
  SignupRoute: SignupRoute,
  ManageTaskRoute: ManageTaskRouteWithChildren,
  TasksManageRoute: TasksManageRoute,
  WorkspacesWorkspaceIdRoute: WorkspacesWorkspaceIdRoute,
  WorkspacesIndexRoute: WorkspacesIndexRoute,
  AssignedTasksIndexRoute: AssignedTasksIndexRoute,
  WorkspacesWorkspaceIdTaskCreateRoute: WorkspacesWorkspaceIdTaskCreateRoute,
  AssignedWorkspaceWorkspaceIdTaskTaskIdRoute:
    AssignedWorkspaceWorkspaceIdTaskTaskIdRoute,
  WorkspacesWorkspaceIdTaskManageTaskIdRoute:
    WorkspacesWorkspaceIdTaskManageTaskIdRoute,
  WorkspacesWorkspaceIdTaskViewTaskIdRoute:
    WorkspacesWorkspaceIdTaskViewTaskIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/dashboard",
        "/login",
        "/product",
        "/signup",
        "/manage/task",
        "/tasks/manage",
        "/workspaces/$workspaceId",
        "/workspaces/",
        "/assigned/tasks/",
        "/workspaces_/$workspaceId/task/create",
        "/assigned/workspace_/$workspaceId/task/$taskId",
        "/workspaces_/$workspaceId/task/manage/$taskId",
        "/workspaces_/$workspaceId/task/view/$taskId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/product": {
      "filePath": "product.tsx"
    },
    "/signup": {
      "filePath": "signup.tsx"
    },
    "/manage/task": {
      "filePath": "manage.task.tsx",
      "children": [
        "/manage/task/$taskId"
      ]
    },
    "/tasks/manage": {
      "filePath": "tasks.manage.tsx"
    },
    "/workspaces/$workspaceId": {
      "filePath": "workspaces.$workspaceId.tsx"
    },
    "/workspaces/": {
      "filePath": "workspaces.index.tsx"
    },
    "/manage/task/$taskId": {
      "filePath": "manage.task.$taskId.tsx",
      "parent": "/manage/task"
    },
    "/assigned/tasks/": {
      "filePath": "assigned.tasks.index.tsx"
    },
    "/workspaces_/$workspaceId/task/create": {
      "filePath": "workspaces_.$workspaceId.task.create.tsx"
    },
    "/assigned/workspace_/$workspaceId/task/$taskId": {
      "filePath": "assigned.workspace_.$workspaceId.task.$taskId.tsx"
    },
    "/workspaces_/$workspaceId/task/manage/$taskId": {
      "filePath": "workspaces_.$workspaceId.task.manage.$taskId.tsx"
    },
    "/workspaces_/$workspaceId/task/view/$taskId": {
      "filePath": "workspaces_.$workspaceId.task.view.$taskId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
