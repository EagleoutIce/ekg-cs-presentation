import React, { useState } from "react";
import { Appear, ListItem, UnorderedList } from "spectacle";

// TODO: make more configurable?
export interface UserBulletPointsProps {
   id: string
   /** if given, will never load from session storage  */
   initialBulletPoints?: string[]
   maxHeight: string
   specialTrigger: (text: string, elem: React.JSX.Element) => React.JSX.Element
}

function getBulletsState(id: string): string[] {
   const got = sessionStorage.getItem(`${id}-retrieved-info-bullets`);
   return got === null ? [] : JSON.parse(got);
}

function setBulletsState(id: string, bullets: string[]): void {
   sessionStorage.setItem(`${id}-retrieved-info-bullets`, JSON.stringify(bullets));
}

export const UserBulletPoints: React.FC<UserBulletPointsProps> = (props: UserBulletPointsProps) => {
   const [bullets, setBullets] = useState(props.initialBulletPoints ?? getBulletsState(props.id))

   const addNewElement =(e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault()
      const input = document.getElementById('new-idea-input') as HTMLInputElement
      if(input.value.trim() === '') return
      const newBullets = [input.value, ...bullets]
      setBullets(newBullets)
      setBulletsState(props.id, newBullets)
      input.value = ''
      input.focus()
   }

   const updateElement = (index: number, e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault()
      const input = document.getElementById(`old-idea-${index}`) as HTMLInputElement
      const newBullets = [...bullets]
      if(input.value.trim() === '') {
         newBullets.splice(index, 1)
      } else {
         newBullets[index] = input.value
      }
      setBullets(newBullets)
      setBulletsState(props.id, newBullets)
      input.value = ''
   }

   return (
      <>
   <UnorderedList>
   <Appear><ListItem key='current'>
      <form onSubmit={e => addNewElement(e)}>
      <input placeholder="Ideen?" type="text" id='new-idea-input' autoFocus={true} autoComplete="off" className="seamless-input-new"></input>
      </form>
   </ListItem></Appear>
</UnorderedList>
<div style={{overflowY: 'auto', maxHeight: "60%"}}><UnorderedList>
   {bullets.map((bullet, i) => <ListItem key={bullet}>
      {props.specialTrigger(bullet, (<form onSubmit={e => updateElement(i, e)} style={{margin:'0px', padding: '0px'}}>
         <input placeholder={bullet} type="text" id={`old-idea-${i}`} className="seamless-input" autoComplete="off"></input>
      </form>))}
      </ListItem>)}
</UnorderedList></div>
</>)
}