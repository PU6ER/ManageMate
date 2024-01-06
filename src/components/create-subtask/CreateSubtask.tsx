import { motion } from 'framer-motion'
import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useProjects } from '../../hooks/useProjects'
import { useTask } from '../../hooks/useTask'
import { useCreateSubtaskMutation } from '../../store/api/subtask.api'
import { ISubtaskData } from '../../types/task.types'
import styles from './CreateSubtask.module.css'
const defaultValue: ISubtaskData = {
	name: '',
	description: '',
	done: false,
}

interface TaskProps {
	handleModal: () => void
}

export default function CreateSubtask({ handleModal }: TaskProps) {
	const [subtask, setSubtask] = useState<ISubtaskData>(defaultValue)
	const { projects } = useProjects()
	const { task } = useTask()
	const [createSubtask] = useCreateSubtaskMutation()
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		createSubtask([subtask, projects[0], task[0]]).then(() => {
			setSubtask(defaultValue)
		})
		setTimeout(() => handleModal(), 1000)
	}
	return (
		<motion.div
			initial={{ y: -10 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<form onSubmit={handleSubmit} className={styles.container}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<span style={{ fontWeight: 'bold' }}>Create new note: </span>
					<button style={{ backgroundColor: '#ffff' }} onClick={handleModal}>
						<AiOutlineClose />
					</button>
				</div>
				<label>
					<input
						type='text'
						placeholder='Name'
						value={subtask.name}
						onChange={e => setSubtask({ ...subtask, name: e.target.value })}
					/>
				</label>
				<label>
					<input
						type='text'
						placeholder='Description'
						value={subtask.description}
						onChange={e =>
							setSubtask({ ...subtask, description: e.target.value })
						}
					/>
				</label>
				<label>
					<input
						type='checkbox'
						placeholder='Description'
						// value={subtask.done}
						checked={subtask.done}
						onChange={e => setSubtask({ ...subtask, done: e.target.checked })}
					/>
				</label>
				{/* <label>
          <input
            type="text"
            placeholder="Status"
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
          />
        </label> */}
				<button type='submit' className={styles.createBtn}>
					Create
				</button>
			</form>
		</motion.div>
	)
}
