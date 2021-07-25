 
ALTER PROCEDURE USP_Cars
(
    @Search              NVARCHAR(25) = NULL,
    -- Pagination
    @PageNbr            INT = 1,
    @PageSize           INT = 10,
    -- Sort Details
    @SortCol            NVARCHAR(20) = ''
)
AS
BEGIN
    DECLARE
        @lContactID         INT, 
        @lFirstName         NVARCHAR(50), 
        @lLastName          NVARCHAR(50), 
        @lEmailAddress      NVARCHAR(50), 
        @lEmailPromotion    INT, 
        @lPhone             NVARCHAR(25)
     
    DECLARE
        @lPageNbr   INT,
        @lPageSize  INT,
        @lSortCol   NVARCHAR(20),
        @lFirstRec  INT,
        @lLastRec   INT,
        @lTotalRows INT
 
    --SET @lContactID         = LTRIM(RTRIM(@ContactID))
    --SET @lFirstName         = LTRIM(RTRIM(@FirstName))
    --SET @lLastName          = LTRIM(RTRIM(@LastName))
    --SET @lEmailAddress      = LTRIM(RTRIM(@EmailAddress))
    --SET @lEmailPromotion    = @EmailPromotion
    SET @lPhone             = LTRIM(RTRIM(@Search))
 
    SET @lPageNbr   = @PageNbr
    SET @lPageSize  = @PageSize
    SET @lSortCol   = LTRIM(RTRIM(@SortCol))
     
    SET @lFirstRec  = ( @lPageNbr - 1 ) * @lPageSize
    SET @lLastRec   = ( @lPageNbr * @lPageSize + 1 ) 
    SET @lTotalRows = @lFirstRec - @lLastRec + 1
 
    ;WITH CTE_Results
    AS (
        SELECT ROW_NUMBER() OVER (ORDER BY
            CASE WHEN @lSortCol = 'Company_Asc' THEN company
                END ASC,
            CASE WHEN @lSortCol = 'Company_Desc' THEN company
                END DESC, 
 
            CASE WHEN @lSortCol = 'Name_Asc' THEN name
                END ASC,
            CASE WHEN @lSortCol = 'Name_Desc' THEN name
                END DESC 
            ) AS ROWNUM,
            id, 
            name +'-'+ company, 
            company, 
            [power],
            Count(*) over () AS MaxRows
        FROM Cars
        WHERE
         (@lPhone IS NULL OR company LIKE @lPhone + '%')
        --    (@lContactID IS NULL OR ContactID = @lContactID)
        --AND (@lFirstName IS NULL OR FirstName LIKE '%' + @lFirstName + '%')
        
        --AND (@lEmailAddress IS NULL OR EmailAddress LIKE '%' + @lEmailAddress + '%')
        --AND (@lEmailPromotion IS NULL OR EmailPromotion = @lEmailPromotion)
        --AND (@lPhone IS NULL OR Phone = @lPhone)
    )
    SELECT
        id, 
        name, 
        company, 
        [power],
        1 AS IsActive,
        MaxRows
    FROM CTE_Results AS CPC
    WHERE
        ROWNUM > @lFirstRec 
    AND ROWNUM < @lLastRec
    ORDER BY ROWNUM ASC
         
END
GO