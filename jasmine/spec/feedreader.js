/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        it('são definidos', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: escreva um teste que faz um loop em cada feed
         * no objeto allFeeds e garante que ele tenha uma URL definida
         * e que o URL não está vazio.
         */

        it('url é definida', function(){
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
                expect(allFeeds[i].url).toContain("http://");
            }
        });

        /* TODO: escreve um teste que faz um loop em cada feed
         * no objeto allFeeds e garante que ele tenha um nome definido
         * e que o nome não está vazio.
         */

        it('tem nome', function(){
            for (let i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
                expect(typeof allFeeds[i].name).toBe('string');
            }
        });

    });


    /* TODO: Write a new test suite named "The menu" */

    describe('O menu', function() {

        /* TODO: Escreva um teste que garanta que o elemento de menu seja
        * oculto por padrão. Você terá que analisar o HTML e
        * o CSS para determinar como estamos executando o
        * ocultação / exibição do elemento de menu.
        */

        it('menu oculto por padrão', function(){
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
        
        /* TODO: Escreva um teste que garanta as mudanças no menu
        * visibilidade quando o ícone do menu é clicado. Esse teste
        * deve ter duas expectativas: o menu exibe quando
        * clicado e oculta quando clicado novamente.
        */

        let toggle = $('.menu-icon-link');
        let body = document.body;

        it('altera a visibilidade quando alguém clica no item de menu', function(){
            toggle.click();
            expect(body.classList).not.toContain('menu-hidden');
            toggle.click();
            expect(body.classList).toContain('menu-hidden');
        });

    });


    /* TODO: Write a new test suite named "Initial Entries" */

    describe('Entradas iniciais', function() {

         
        /* TODO: Escreva um teste que garanta quando o loadFeed
        * função é chamada e completa seu trabalho, há pelo menos
        * um único elemento .entry dentro do container .feed.
        * Lembre-se, loadFeed () é assíncrono, então este teste exigirá
        * o uso da função BeforeEach e assynchronous done () de Jasmine.
        */

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('loadFeed tem elemento', function(){
            expect($('.entry').length).toBeGreaterThan(0);
        });

    });


    /* TODO: Write a new test suite named "New Feed Selection" */

    describe('Nova seleção de feed', function() {

        
        /* TODO: Escreva um teste que garanta quando um novo feed é carregado
        * pela função loadFeed que o conteúdo realmente muda.
        * Lembre-se, loadFeed () é assíncrono.
        */

        let fistFeed;
        let secondFeed;

        beforeEach(function(done) {
            loadFeed(0, function(){
                fistFeed = $('.feed').html();
                done();
            });
        });

        it('altera o feed quando tiver atualização', function(done){
            loadFeed(1, function() {
                expect(fistFeed).toBeDefined();
                secondFeed = $('.feed').html();
                expect(secondFeed).toBeDefined();
                expect(fistFeed).not.toEqual(secondFeed);
                done();
            });
        });

   }); 
}());
