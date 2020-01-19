FUNCTION eval_frequency (employee_id IN employees.employee_id%TYPE) 
  RETURN PLS_INTEGER AS
  hire_date   employees.hire_date%TYPE;     -- start of employment
  today       employees.hire_date%TYPE;     -- today's date
  eval_freq   PLS_INTEGER;                  -- frequency of evaluations
  job_id      employees.job_id%TYPE;        -- category of the job
  
BEGIN
  SELECT SYSDATE INTO today FROM DUAL;    -- set today's date
  SELECT e.hire_date INTO hire_date          -- determine when employee started
      FROM employees e
      WHERE employee_id = e.employee_id;
 
  IF((hire_date + (INTERVAL '120' MONTH)) < today) THEN
     eval_freq := 1;
     
     /* Suggesting salary increase based on position */
     SELECT e.job_id INTO job_id FROM employees e
       WHERE employee_id = e.employee_id;  
      CASE job_id
        WHEN 'PU_CLERK' THEN DBMS_OUTPUT.PUT_LINE(
         'Consider 8% salary increase for employee number ' || employee_id);
        WHEN 'SH_CLERK' THEN DBMS_OUTPUT.PUT_LINE(
         'Consider 7% salary increase for employee number ' || employee_id);
        WHEN 'ST_CLERK' THEN DBMS_OUTPUT.PUT_LINE(
         'Consider 6% salary increase for employee number ' || employee_id);
        WHEN 'HR_REP' THEN DBMS_OUTPUT.PUT_LINE(
         'Consider 5% salary increase for employee number ' || employee_id);
        WHEN 'PR_REP' THEN DBMS_OUTPUT.PUT_LINE(
         'Consider 5% salary increase for employee number ' || employee_id);
        WHEN 'MK_REP' THEN DBMS_OUTPUT.PUT_LINE(
         'Consider 4% salary increase for employee number ' || employee_id);
        ELSE DBMS_OUTPUT.PUT_LINE( 
         q'{Nothing to do for employee #}' || employee_id);
      END CASE;

   ELSE
     eval_freq := 2;
   END IF;
 
   RETURN eval_freq;
 END eval_frequency;