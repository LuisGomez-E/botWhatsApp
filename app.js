const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowMedios = addKeyword(['medios']).addAnswer([
    '👉 *NEQUI* Nequi',
    '👉 *BC* Bancolombia.',
    '👉 *DB* DaviPlata.'
    ])

const flowSecundario = addKeyword(['pedir']).addAnswer([
    '👉 *Medios* Para ver los medios de pagos disponibles',
    '👉 *Menu* para regresar al menu.'
    ],
    null,
    null,
    [flowMedios]
)

const flowCancelar = addKeyword(['can', 'cancelar']).addAnswer(
    [
        'Gracias por haberte comunicado con floristería detalles es un gusto para nosotros atenderte',
        '👉 *menú* Para regresar al menú inicial'

    ],
    null,
    null,
    [flowSecundario]
)

const flow1 = addKeyword(['1']).addAnswer('Ingrese al síguete link para ver nuestro catalogo en PDF …').addAnswer(
    [
        '👉 *Pedir* Para realizar un pedido',
        '👉 *Menu* para regresar al menú inicial'
    ],
    null,
    null,
    [flowSecundario]
)

const flow2 = addKeyword(['2']).addAnswer('Ingrese al síguete link para ver nuestro catalogo en PDF …').addAnswer(
    [
        '👉 *Pedir* Para realizar un pedido',
        '👉 *Menu* para regresar al menú inicial'

    ],
    null,
    null,
    [flowSecundario]
)

const flow3 = addKeyword(['3']).addAnswer('Ingrese al síguete link para ver nuestro catalogo en PDF …').addAnswer(
    [
        '👉 *Pedir* Para realizar un pedido',
        '👉 *Menu* para regresar al menú inicial'

    ],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ola', 'ole', 'alo','menu'])
    .addAnswer('Bienvenido al *ChatBot Detalles* es un gusto poder ayudarte.')
    .addAnswer(
        [
            'te comparto el siguiente menú de interés para ti.',
            '👉 *1* para ver catálogo de ramos disponibles',
            '👉 *2* Para ver catálogo de ramos',
            '👉 *3* Para ver catálogo de ramos fúnebres',
            '👉 *can* Para cancelar'

        ],
        null,
        null,
        [flowCancelar, flow2, flow1, flow3]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
