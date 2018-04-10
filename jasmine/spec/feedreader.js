/* Adicionando os testes dentro de $()function, alguns desses testes podem requerer elementos DOM. */

$(function() {

    /* Suite de teste referente ao RSS Feeds. */

    describe('RSS Feeds', function() {

        /* Testa se allFeeds variavel foi definida e que não é vazia */

        it('são definidos', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        /* Teste que faz um loop em cada feed
         * no objeto allFeeds e garante que ele tenha uma URL definida
         * e que a URL não está vazia.
         */

        it('url é definida', function(){
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
                expect(feed.url).toMatch(/^((http|https):\/\/)/);
            });
        });

        /* Teste que faz um loop em cada feed
         * no objeto allFeeds e garante que ele tenha um nome definido
         * e que o nome não está vazio.
         */

        it('tem nome', function(){
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
                expect(typeof feed.name).toBe('string');
            });
        });

    });


    /* Suite de teste referente ao menu */

    describe('O menu', function() {

        /* Teste que garanta que o elemento de menu seja
         *  oculto por padrão.
         */

        it('menu oculto por padrão', function(){
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
        
        /* Teste que garanta as mudanças no menu
         *  visibilidade quando o ícone do menu é clicado.
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


    /* Suite de testes entradas iniciais */

    describe('Entradas iniciais', function() {

        /* Teste que garante quando o loadFeed
         * função é chamada e completa seu trabalho, há pelo menos
         * um único elemento .entry dentro do container .feed.
         */

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('loadFeed tem elemento', function(){
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });

    });


    /* Suite de testes referente a Nova seleção de feed */

    describe('Nova seleção de feed', function() {
        
        /* Teste que garante quando um novo feed é carregado
         * pela função loadFeed que o conteúdo realmente muda.
         */

        var firstFeed, secondFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                firstFeed = $('.feed').html();
                loadFeed(1, function() {
                    done();
                });
            });        
        });

        it('altera o feed quando tiver atualização', function(){
            expect(firstFeed).toBeDefined();
            secondFeed = $('.feed').html();
            expect(secondFeed).toBeDefined();
            expect(firstFeed).not.toEqual(secondFeed);
        });

   });
   
}());
