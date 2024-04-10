import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerChangedAddress from "../customer-changed-address.event";

export default class EnviaConsoleLogHandler 
  implements EventHandlerInterface<CustomerChangedAddress> {

  handle(event: CustomerChangedAddress): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} Alterado para:
       ${event.eventData.Address.street}, ${event.eventData.Address.number}, 
       ${event.eventData.Address.zip}, ${event.eventData.Address.city}`
    );
  } 
}