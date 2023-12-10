import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import styled from 'styled-components';
import Modal from 'react-modal';

const Container = styled.div`
  padding: 20px;
  font-family: 'Arial', sans-serif;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalInput = styled.input`
  margin-bottom: 10px;
  padding: 8px;
`;

const localizer = momentLocalizer(moment);

const MyCalendar = ({ events, onEventAdd, onEventEdit, onEventDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventAdd = slotInfo => {
    setSelectedEvent({
      id: events.length + 1,
      title: '',
      start: slotInfo.start,
      end: slotInfo.end,
      hexColor: '#ffc107',
    });
    setIsModalOpen(true);
  };

  const handleEventEdit = eventId => {
    const eventToEdit = events.find(event => event.id === eventId);
    setSelectedEvent(eventToEdit);
    setIsModalOpen(true);
  };

  const handleEventDelete = eventId => {
    onEventDelete(eventId);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleModalSave = () => {
    if (selectedEvent) {
      if (selectedEvent.id) {
        onEventEdit(selectedEvent);
      } else {
        onEventAdd(selectedEvent);
      }
      setIsModalOpen(false);
      setSelectedEvent(null);
    }
  };

  return (
    <Container>
      <ButtonContainer>
        <Button onClick={() => handleEventAdd({ start: new Date(), end: new Date() })}>
          Agregar Evento
        </Button>
      </ButtonContainer>
      <Calendar
        localizer={localizer}
        selectable
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'week', 'day']}
        defaultView="month"
        onSelectEvent={event => handleEventEdit(event.id)}
        onDoubleClickEvent={event => handleEventDelete(event.id)}
        eventPropGetter={(event, start, end, isSelected) => {
          const backgroundColor = isSelected ? '#007bff' : event.hexColor;
          const style = {
            backgroundColor,
            borderRadius: '5px',
            opacity: 0.8,
            color: 'white',
            border: '0',
            display: 'block',
          };
          return { style };
        }}
        components={{
          event: ({ event }) => (
            <div>
              <strong>{event.title}</strong>
              <div>
                <button onClick={() => handleEventEdit(event.id)}>Editar</button>
                <button onClick={() => handleEventDelete(event.id)}>Eliminar</button>
              </div>
            </div>
          ),
        }}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Editar Evento"
      >
        <ModalContainer>
          <ModalInput
            type="text"
            placeholder="Título del Evento"
            value={selectedEvent?.title || ''}
            onChange={e => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
          />
          <button onClick={handleModalSave}>Guardar</button>
          <button onClick={handleModalClose}>Cancelar</button>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

function App() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Reunión Importante',
      start: new Date(2023, 2, 15, 10, 0),
      end: new Date(2023, 2, 15, 11, 0),
      hexColor: '#e6194B',
    },
    {
      id: 2,
      title: 'Entrenamiento',
      start: new Date(2023, 2, 18, 14, 0),
      end: new Date(2023    , 2, 18, 15, 0),
      hexColor: '#3cb44b',
    },
    {
      id: 3,
      title: 'Conferencia',
      start: new Date(2023, 2, 22, 16, 0),
      end: new Date(2023, 2, 22, 18, 0),
      hexColor: '#ffe119',
    },
  ]);
  
  const handleEventAdd = newEvent => {
    setEvents(prevEvents => [...prevEvents, newEvent]);
  };
  
  const handleEventEdit = editedEvent => {
    setEvents(prevEvents =>
      prevEvents.map(event => (event.id === editedEvent.id ? editedEvent : event))
    );
  };
  
  const handleEventDelete = eventId => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };
  
  return (
    <div>
      <MyCalendar
        events={events}
        onEventAdd={handleEventAdd}
        onEventEdit={handleEventEdit}
        onEventDelete={handleEventDelete}
      />
    </div>
  );
  }
  
  export default App;
  
