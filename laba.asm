#include <def21060.h>

#define sizeA 36
#define sizeB 1



.SECTION/DM dm_data;
.VAR A[sizeA]="input.dat";

.SECTION/PM pm_data;
.VAR B[sizeB]="input1.dat";
.VAR C[sizeA];

.SECTION/PM pm_irq_svc;
       nop;
       jump start;
       nop;
       nop;
       
 .SECTION/PM pm_code;
   start:  
  I0=A;
  I8=B;         
  I9=C;    
          
    M0=1;  
    M8=1;
 
    M2=0;
    R11=255;
     R1=PM(I8,M8); //явхршбюел гмювемхе B
     R9=R1; //гюонлмхкх гмювемхе B
     F1=FLOAT R1; // опенапюгнбшбюел б FLOAT;
     
     F0=RECIPS F1; //мюундхл 1/F1
     
     LCNTR=sizeA, DO XXX UNTIL LCE;
     
       R3=DM(I0,M0); 
       R7=R3*R9(SSI);  
       
       F7=FLOAT R7;// опенапюгнбшбюел б FLOAT;
       F12=F0*F7;
       
       
       R12= FIX F12;  //НЙПСЦКЪЕЛ 
       
       R12=PASS R12;  // опнбепйюмю лемэье мскъ <0
       IF LT R12=M2;
       
       COMP(R11,R12);  // >255
       IF LT R12=R11;
       
          XXX:  PM(I9,M8)=R12;
          
   wait: IDLE;
         jump wait;   
       