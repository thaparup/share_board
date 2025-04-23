import { createFileRoute } from '@tanstack/react-router'
import Body from '../components/Body'
import { Button } from '../components/ui/button'
import WorkspaceModal from '../components/WorkspaceModal'
import { useMutationCreateWorkspace } from '../Api-Client/workspace'
import toast from 'react-hot-toast'

export const Route = createFileRoute('/workspaces')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Body>
    <div className='flex flex-col gap-8 '>

      <WorkspaceModal />
      <div>
        <h1>Your Workpsaces</h1>
      </div>
      <div>
        <h1>Workspaces Your're Part Of</h1>
      </div>
    </div>
  </Body>
}
