import Atropos from "atropos/react"
import 'atropos/css'

const AtroposComponent = () => {


  return (
    <article className="size-64 sm:size-72 md:size-80 relative overflow-hidden backdrop-blur-md dark:bg-neutral-900/80 bg-neutral-400/80 rounded-full" data-atropos-offset="5">
        <Atropos className="size-full" rotateXMax={5} rotateYMax={5} shadow={true} shadowScale={3} activeOffset={30}>

            <div data-atropos-offset="15" className="size-full z-20 rounded-full">
                <img src="/avatar.png" alt="avatar"  className=" backdrop-blur-md size-full relative -bottom-6 z-30 object-contain sombra" />
            </div>
        </Atropos>
    </article>
  )
}

export default AtroposComponent;
