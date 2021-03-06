@isTest
public class ManyWhoFlowUserSessionController_Tests {

    public static testMethod void myUnitTestConstructor() {
        ManyWhoFlowUserSessionController sessionController = new ManyWhoFlowUserSessionController();
    }
    
     public static testMethod void myUnitTestLightningOriginProd() {
        ManyWhoFlowUserSessionController sessionController = new ManyWhoFlowUserSessionController();
        System.assertEquals('https://null', sessionController.getLightningOrigin());
    }
    
     public static testMethod void myUnitTestGetValid() {
        ManyWhoFlowUserSessionController sessionController = new ManyWhoFlowUserSessionController();
        System.assertEquals(false, sessionController.getValid());
    }
    
    public static testMethod void myUnitTestGetValidCommunites() {
        Test.setCurrentPageReference(new PageReference('Page.myPage'));
        System.currentPageReference().getParameters().put('lightning-origin', 'lightningOriginProd');
        System.currentPageReference().getParameters().put('community-name', 'communityName');
        
        ManyWhoCommunity__c manyWhoCommunity = new ManyWhoCommunity__c(Name='communityName', LightningOrigin__c='lightningOriginProd' );
        insert manyWhoCommunity;
        
        ManyWhoFlowUserSessionController sessionController = new ManyWhoFlowUserSessionController();
        ManyWhoFlowUserSessionController.saveDomains('communityName','lightningOriginProd');
        
        Boolean valid = sessionController.getValid();
        System.assertEquals(true, sessionController.getValid());
        
    }
}