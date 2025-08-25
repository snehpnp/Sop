import React, { useEffect, useState } from 'react'
import Content from '../../../ExtraComponent/Content'
import { GetUnansweredQue, SubmitAnswer } from '../../CommonAPI/ChatbotApi'
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

const ResponseQnA = () => {
    const [unansweredQue, setUnansweredQue] = useState([])
    const [openIndex, setOpenIndex] = useState(null)
    const [answer, setAnswer] = useState("")
    const [strategyType, setStrategyType] = useState("")

    const fetchQuestions = async () => {
        try {
            const response = await GetUnansweredQue()
            if (response) {
                setUnansweredQue(response.unanswered_question.map((item) => item.question))
            }
            else {
                setUnansweredQue([])
            }
        }
        catch (error) {
            console.error("Error fetching unanswered questions: ", error)
        }
    }

    useEffect(() => {
        fetchQuestions()
    }, [])

    const handleOpen = (idx) => {
        setOpenIndex(idx)
        setAnswer("")
        setStrategyType("")
    }

    const handleCancel = () => {
        setOpenIndex(null)
        setAnswer("")
        setStrategyType("")
    }

    const handleSubmit = async (question) => { 
        const data = {
            question: question,
            answer: answer,
            strategy_type: strategyType
        }

        const response = await SubmitAnswer(data)
        if (response.Status) {
            toast.success("Answer submitted successfully")
            fetchQuestions()
        }
        else {
            alert("Failed to submit answer")
        }

        setOpenIndex(null)
        setAnswer("")
        setStrategyType("")
    }

    // Add this style tag for smooth accordion animation
    const accordionStyle = `
    .smooth-accordion {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .smooth-accordion.open {
      max-height: 500px; /* enough for your content */
      transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    `;

    return (
        <Content>
            <style>{accordionStyle}</style>
            <div style={{ maxWidth: '100%', margin: '0 auto' }}>
                <h2>💡 Unanswered Questions</h2>
                {unansweredQue.length === 0 ? (
                    <p>No unanswered questions found.</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {unansweredQue.map((q, idx) => (
                            <li key={idx} style={{ marginBottom: 20, border: '1px solid #ddd', borderRadius: 6, padding: 16, width: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                    <span className='card-text-Color'><b>{idx + 1}.</b> <b>Question :</b> {q}</span>
                                    <button
                                        onClick={() => openIndex === idx ? handleCancel() : handleOpen(idx)}
                                        style={{ padding: '6px 16px', borderRadius: 4, border: '1px solid #007bff', background: '#fff', color: '#007bff', cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        aria-label={openIndex === idx ? 'Close' : 'Open'}
                                    >
                                        {openIndex === idx ? '▲' : '▼'}
                                    </button>
                                </div>
                                <div className={`smooth-accordion${openIndex === idx ? ' open' : ''}`}>
                                    <div className='card-bg-color' style={{ marginTop: 16, padding: 12, borderRadius: 4, width: '100%', display: openIndex === idx ? 'block' : 'none' }}>
                                        <b className='card-text-Color'>Answer :</b>
                                        <input
                                            type="text"
                                            value={answer}
                                            onChange={e => setAnswer(e.target.value)}
                                            placeholder="Type your answer..."
                                            style={{ width: '100%', padding: 8, marginBottom: 12, borderRadius: 4, border: '1px solid #ccc', marginTop: 8 }}
                                        />
                                        <div style={{ marginBottom: 12 }}>
                                            <b className='card-text-Color'>Strategy Type :</b>
                                            <select
                                                value={strategyType}
                                                onChange={e => setStrategyType(e.target.value)}
                                                style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', marginTop: 8 }}
                                            >
                                                <option value="">Select Strategy Type</option>
                                                <option value="Add Script">Add Script</option>
                                                <option value="Copy script">Copy script</option>
                                                <option value="Trade Report">Trade Report</option>
                                                <option value="Trade Respone">Trade Respone</option>
                                                <option value="Trade History">Trade History</option>
                                            </select>
                                        </div>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button onClick={() => handleSubmit(q)} style={{ padding: '6px 16px', borderRadius: 4, border: '1px solid #28a745', background: '#28a745', color: '#fff', cursor: 'pointer' }}>Submit</button>
                                            <button onClick={handleCancel} style={{ padding: '6px 16px', borderRadius: 4, border: '1px solid #dc3545', background: '#dc3545', color: '#fff', cursor: 'pointer' }}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Content>
    )
}

export default ResponseQnA