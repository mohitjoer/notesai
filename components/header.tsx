import { Button } from './ui/button'
import { SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

function Header() {
  return (
    <div className='flex flex-row justify-between items-center p-4 bg-black text-white'>
        <div>
           <h2 className='font-bold text-2xl font-mono'>Note's AI</h2>
        </div>
        <div>
            {/* file name */}
        </div>
        <div>
             <SignedIn >
                  <UserButton/>
            </SignedIn>

            <SignedOut>
                <Button asChild variant="secondary">
                  <SignInButton/>
                </Button>
            </SignedOut>
        </div>    
    </div>
  )
}
export default Header