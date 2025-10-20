
import './App.css'
import Navbar from './components/Navbar'
import CreateSnippet from './components/CreateSnippet'
import CreateComment from './components/CreateComment'

function App() {

  return (
    <main className='container max-w-4xl mx-auto p-4'>
      <Navbar />
      <CreateSnippet />
    </main>
  )
}

export default App
